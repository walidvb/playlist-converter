var bandcamp = require('bandcamp-scraper');
var stringSimilarity = require('string-similarity');

module.exports = (list) => {
  let i = 0
  const results = []
  const missed = []
  const searchOne = (byAlbumName = true) => {
    const current = list[i]
    const searchKey = byAlbumName ? 'name' : 'artist'
    const matchKey = !byAlbumName ? 'name' : 'artist'

    const isLastAttempt = !byAlbumName
    var params = {
      query: `${current[searchKey].toLowerCase()}`,
      page: 1
    };
    bandcamp.search(params, function(error, searchResults) {
      if (error) {
        console.log(error);
      } else {
        const match = searchResults.find((result) => isMatch(current[matchKey], {type: result.type, query: result[matchKey]}))
        if(match){
          results.push(match.url)
        }
        else{
          if (!isLastAttempt){
            console.log(`---trying ${current.name} - ${current.artist} by artist`)
            searchOne(false)
            return
          }
          // console.log(searchResults)
          missed.push(i)
        }
        console.log(`${current.name} - ${current.artist} ${match ? 'found' : `not found (${missed.length})`}`);
      }
      if(i < list.length - 1){
      // if(i < 2){
        i++
        setTimeout(() => searchOne(list[i]), 2000)
      }
      else{
        console.dir(results)
        if(missed.length){
          console.dir("=================== missed==========================")
          console.dir(missed.map(ii => `${list[ii].artist} ${list[ii].name}`))
        }
      }
    });

  }

  const isMatch = (artist, { type, query }) => type === 'album' && stringSimilarity.compareTwoStrings(query.toLowerCase(), artist.toLowerCase()) > .4
  searchOne()
}
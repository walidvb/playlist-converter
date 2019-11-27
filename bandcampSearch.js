var bandcamp = require('bandcamp-scraper');
var stringSimilarity = require('string-similarity');

module.exports = (list) => {
  let i = 0
  const results = []
  const missed = []
  let oldQueries = {}
  const searchOne = (attemptsCount) => {
    const current = list[i]

    const matchKey = attemptsCount > 1 ? 'name' : 'artist'

    function getQueryString(){
      if (attemptsCount === 0){
        return `${current.artist} ${current.name}`.toLowerCase()
      }
      if( attemptsCount === 1){
        return `${current.name}`.toLowerCase()
      }
      return `${current.artist}`.toLowerCase()
    }
    var params = {
      query: getQueryString(),
      page: 1
    };

    const isLastAttempt = attemptsCount > 1
    bandcamp.search(params, function(error, searchResults) {
      if (error) {
        console.log(error);
      } else {
        const match = searchResults.find((result) => isMatch(current[matchKey], {type: result.type, query: result[matchKey]}))
        if(match){
          results.push(`${current.artist} - ${current.name} (${match.url})`)
        }
        else{
          firstResults = searchResults

          if (!isLastAttempt){
            console.log(`---trying ${current.name} - ${current.artist} by artist`)
            oldQueries[params.query] = searchResults
            searchOne(attemptsCount + 1)
            return
          }
          // console.log(firstResults)
          console.log("======byArtist")
          // console.log(searchResults)
          console.log("======")
          results.push(`${current.artist} - ${current.name}`)
          missed.push(i)
        }
        console.log(`${current.name} - ${current.artist} ${match ? 'found' : `not found (${missed.length})`}`);
      }
      if(i < list.length - 1){
      // if(i < 2){
        i++
        setTimeout(() => searchOne(0), 2000)
      }
      else{
        console.dir(results)
        if(missed.length){
          console.dir("=================== missed==========================")
          console.dir(missed.map(ii => `${list[ii].artist} ${list[ii].name}`))
        }
        console.dir(results.join('\n'))
      }
    });

  }

  const isMatch = (artist, { type, query }) => type === 'track' && stringSimilarity.compareTwoStrings(query.toLowerCase(), artist.toLowerCase()) > .4
  searchOne(0)
}
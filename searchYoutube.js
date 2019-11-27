var youtubeSearch = require('youtube-search');
var { YOUTUBE_API_KEY } = require('./credentials.js')
let links = []
var opts = {
  key: YOUTUBE_API_KEY
};
module.exports = (list) => {
  let i = 0
  const searchOne = (track) => {
    console.log(`searching for ${track.name} ${track.artist}`)
    youtubeSearch(`${track.name} ${track.artist}`, opts, function (error, searchResults) {
      if (error) {
        try{
          console.log(`==============${track.name} ${track.artist}==============`)
          console.log("============================")
          console.log(error);
        }
        catch(err){
          console.log(`stopped at: ${i}`)
          console.log(JSON.stringify(links))
          console.log(err)
        }
        return
      }
      const match = searchResults.find(res => /video/.test(res.kind))
      links.push(match.link)
      if (i < list.length - 1) {
      // if(i < 0){
        i++
        searchOne(list[i])
      }
      else {
        console.log(JSON.stringify(links))
      }
    });
  }

  searchOne(list[i])
}
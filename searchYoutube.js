var youtubeSearch = require('youtube-search');
var { YOUTUBE_API_KEY } = require('./credentials.js')
let i = 0
let links = []
var opts = {
  key: '< INSERT YOUR API KEY HERE >'
};
module.exports = (list) => {
  const searchOne = (track) => {
    youtubeSearch(`${track.name} ${track.artist}`, opts, function (error, searchResults) {
      if (error) {
        console.log(`==============${track.name} ${track.artist}==============`)
        console.log("============================")
        console.log(error.response.data);
        console.log(`stopped at: ${i}`)
        return
      } else {
        console.dir(searchResults[0].link)
        links.push(searchResults[0].link)
      }
      if (i < list.length - 1) {
        // if(i < 3){
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
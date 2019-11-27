# RUN

edit code to run bandcamp / youtube in `index.js`

lists should export an array of `{artist, name}` objects:
```
module.exports = [
  {
    artist: 'hiss21292',
    name: 'augun',
  },
]
```
## youtube

- limited to 100 queries per day(how to increase that? OAuth by user?)
- requires an API key declared in `credentials.js`:

```
module.exports = {
  YOUTUBE_API_KEY: '<YOUR-API-KEY>'
}
```


## bandcamp

TODO: 

 - better matching of track names(currently takes the first `stringIsSimilar > .4`)
 - search within album if track not found


# extension

to be packaged, but code is in `spotifyToPlaylist.js` and can be run from the console (be mindful to scroll down to load the complete playlist)
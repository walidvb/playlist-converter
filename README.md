# RUN

edit code to run bandcamp / youtube in `index.js`

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

// how to use: 
// on embed: https://share.getcloudapp.com/d5ub5A0K
// on playlist: todo

(function (document) {
  let { wrapper, rowClass, nameClass, artistClass } = getSelectors();

  var container = document.createElement('textarea');
  document.body.appendChild(container)
  var results = [...wrapper.querySelectorAll(rowClass)].map(s => {
    const name = s.querySelectorAll(nameClass)[0].innerText
    const artist = s.querySelectorAll(artistClass)[0].innerText
    return { name, artist }
  })
  container.value = JSON.stringify(results);
  container.select();
  document.execCommand("copy");

  var message = results.length + ' tracks copied to your clipboard, paste to see!'
  setTimeout(() => alert(message), 10)
  console.log(message)
  console.table(results)


  function getSelectors() {
    const pageHref = document.location.href
    let wrapper, rowClass, nameClass, artistClass;
    if (/spotify/.test(pageHref)) {
      const isFullPage = !/embed/.test()
      if (isFullPage) {
        rowClass = '.tracklist-row'
        nameClass = '.tracklist-name'
        artistClass = '.TrackListRow__artists'
        wrapper = document
      }
      else {
        wrapper =
          rowClass = '.ah.dr.b3'
        nameClass = '.ao.ap.ds.b3.bs.bu.bt.dt'
        artistClass = '.ao.du.ds.b3.bs.bu.bt.ae.dp'
        wrapper = document.querySelectorAll('#main table')[0]
      }
    }
    else if (/music\.apple\.com/.test(pageHref)) {
      wrapper = document
      rowClass = '.tracklist-item__wrapper'
      nameClass = '.tracklist-item__first-line'
      artistClass = '.table__row__link--secondary'
    }
    return { wrapper, rowClass, nameClass, artistClass }
  }
})(document)
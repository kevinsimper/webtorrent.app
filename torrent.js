var WebTorrent = require('webtorrent-hybrid')

var client = new WebTorrent()
var magnet = 'magnet:?xt=urn:btih:bb48b51d5a902f99c8506f6707f952bdaa2153ad&dn=10_246_16_21.sql&tr=wss%3A%2F%2Ftracker.webtorrent.io'


client.add(magnet, function (torrent) {
  console.log('Torrent info hash:', torrent.infoHash)

  torrent.files.forEach(function (file) {
    // Get a url for each file
    file.getBlobURL(function (err, url) {
      if (err) throw err

      // Add a link to the page
      var a = document.createElement('a')
      a.download = file.name
      a.href = url
      a.textContent = 'Download ' + file.name
      document.body.appendChild(a)
    })
  })
})
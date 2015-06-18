var fs = require('fs')
var app = require('app')  // Module to control application life.
var BrowserWindow = require('browser-window')  // Module to create native browser window.
var WebTorrent = require('webtorrent-hybrid')

// Report crashes to our server.
require('crash-reporter').start()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  // Open the devtools.
  mainWindow.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  var client = new WebTorrent()
  var magnet = 'magnet:?xt=urn:btih:bb48b51d5a902f99c8506f6707f952bdaa2153ad&dn=10_246_16_21.sql&tr=wss%3A%2F%2Ftracker.webtorrent.io'


  client.add(magnet, function (torrent) {
    console.log('Torrent info hash:', torrent.infoHash)

    torrent.files.forEach(function (file) {
      // Get a url for each file
      file.getBlobURL(function (err, url) {
        if (err) throw err

        var source = file.createReadStream()
        var destination = fs.createWriteStream(file.name)
        source.pipe(destination)
      })
    })
  })
})

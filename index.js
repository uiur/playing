require('es6-promise').polyfill()

var itunes = require('playback')
var findMusic = require('./lib/find-music.js')
var detectCountry = require('./lib/detect-country.js')
var Hipchat = require('hipchatter')

var hipchat = new Hipchat(process.env.HIPCHAT_TOKEN)

itunes.on('playing', function (data) {
  detectCountry().then(function (country) {
    findMusic([ data.name, data.artist, data.album ], {
      country: country
    }).then(function (music) {
      notify(
        '🎵  ' +
        '<a href="' + music.trackViewUrl + '">' + data.name + ' - ' + data.artist + '</a>'
      )
    })
  })
})

function notify (message) {
  hipchat.notify(process.env.HIPCHAT_ROOM, {
    message: message,
    notify: true
  }, function (err) { if (err) console.error(err) })
}

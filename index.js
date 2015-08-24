require('es6-promise').polyfill()

var itunes = require('playback')
var Hipchat = require('hipchatter')

var findMusic = require('./lib/find-music.js')
var detectCountry = require('./lib/detect-country.js')

if (!(process.env.HIPCHAT_TOKEN && process.env.HIPCHAT_ROOM)) {
  console.error('`HIPCHAT_TOKEN` and `HIPCHAT_ROOM` are required.')
  console.error('Usage: HIPCHAT_TOKEN=token HIPCHAT_ROOM=room_id npm start')

  process.exit(1)
}

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

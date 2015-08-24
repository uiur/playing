var itunes = require('playback')
var Hipchat = require('hipchatter')

var hipchat = new Hipchat(process.env.HIPCHAT_TOKEN)

itunes.on('playing', function (data) {
  hipchat.notify(process.env.HIPCHAT_ROOM, {
    message: 'playing: ' + JSON.stringify(data),
    notify: true
  }, function (err) { if (err) console.error(err) })
})

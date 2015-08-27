var menubar = require('menubar')

var ipc = require('ipc')
var run = require('./index.js')

var mb = menubar({ preloadWindow: true })

mb.on('ready', function ready () {
  ipc.on('data', function (event, data) {
    console.log(data)
    update(data)
  })

  ipc.once('data', run)
})

function update (state) {
  process.env.SLACK_WEBHOOK_URL = state.slack
  process.env.HIPCHAT_TOKEN = state.hipchat.token
  process.env.HIPCHAT_ROOM = state.hipchat.room
  run.disabled = !state.checked
}

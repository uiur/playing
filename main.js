const path = require('path')

var menubar = require('menubar')

var ipcMain = require('electron').ipcMain
var itunes = require('./index.js')

var mb = menubar({ preloadWindow: true, icon: path.join(__dirname, '/Icon.png') })

mb.on('ready', function ready () {
  ipcMain.on('data', function (event, data) {
    update(data)
  })

  ipcMain.once('data', itunes.listen)
})

ipcMain.on('terminate', function terminate () {
  mb.app.quit()
})

ipcMain.on('sendnow', function sendnow () {
  itunes.sendNow()
})

function update (state) {
  process.env.SLACK_WEBHOOK_URL = state.slackWebhookUrl
  process.env.LISTENER_NAME = state.listenerName
  process.env.AUTO_SEND = state.autoSend
}

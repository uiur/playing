var once = require('once')
var fetch = require('isomorphic-fetch')

module.exports = once(function () {
  return ipInfo().then(function (data) {
    return data.country
  })
})

function ipInfo () {
  return fetch('http://ipinfo.io/json').then(function (res) {
    return res.json()
  }).catch(function (err) {
    console.error(err.stack)
  })
}

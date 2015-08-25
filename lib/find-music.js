var fetch = require('isomorphic-fetch')

module.exports = function findMusic (keywords, options) {
  options = options || { country: 'US' }

  var query = keywords.map(function (keyword) {
    return encodeURIComponent(keyword)
  }).join('+')

  return fetch('https://itunes.apple.com/search?term=' + query + '&media=music&limit=1&country=' + options.country).then(function (res) {
    if (res.status >= 400) {
      throw new Error(res.statusText)
    }

    return res.json()
  }).then(function (data) {
    return data.results[0]
  })
}

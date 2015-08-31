'use strict'

const React = require('react')
const ipc = require('ipc')

const App = React.createClass({
  getInitialState () {
    return {
      slack: window.localStorage.getItem('slack')
    }
  },

  componentDidMount () {
    ipc.send('data', this.state)
  },

  componentDidUpdate () {
    ipc.send('data', this.state)
  },

  render () {
    const self = this

    return (
      React.DOM.div({}, [
        React.DOM.button({
          className: 'btn btn-default',
          onClick: function () {
            ipc.send('terminate')
          }
        }, 'Quit'),

        React.DOM.div({}, [
          React.DOM.h2({}, 'Slack'),
          React.DOM.input({
            className: 'form-control',
            type: 'text',
            placeholder: 'slack webhook url',
            value: this.state.slack,
            onChange: function (e) {
              self.setState({ slack: e.target.value })
              window.localStorage.setItem('slack', e.target.value)
            }
          })
        ])
      ])
    )
  }
})

React.render(React.createFactory(App)(), document.body)

var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')

var menu = new Menu()
menu.append(new MenuItem({
  label: 'Copy',
  selector: 'copy:'
}))
menu.append(new MenuItem({
  label: 'Paste',
  selector: 'paste:'
}))

window.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)

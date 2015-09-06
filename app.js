'use strict'

const React = require('react')
const ipc = require('ipc')
const shell = require('shell')
const url = require('url')

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

  inputIsValid () {
    return url.parse(this.state.slack || '').host === 'hooks.slack.com'
  },

  render () {
    const self = this

    return (
      React.DOM.main({
        className: 'container'
      }, [
        React.DOM.div({}, [
          React.DOM.h2({}, 'playing'),
          React.DOM.p({ className: 'description' }, [
            React.DOM.a({
              href: 'https://slack.com/services/new/incoming-webhook',
              onClick: function (e) {
                e.preventDefault()
                shell.openExternal(e.target.href)
              }
            }, 'Add a new Incoming Webhook in Slack'),
            '\nand paste the webhook URL to this form.'
          ]),

          React.DOM.label({}, 'Slack Webhook URL'),
          React.DOM.input({
            className: 'form-control',
            type: 'text',
            placeholder: 'https://hooks.slack.com/...',
            value: this.state.slack,
            onChange: function (e) {
              self.setState({ slack: e.target.value })
              window.localStorage.setItem('slack', e.target.value)
            }
          }),
          this.inputIsValid() && React.DOM.div({ className: 'alert alert-success' }, '✔ Play music on iTunes!')
        ]),

        React.DOM.button({
          className: 'btn btn-default btn-quit',
          onClick: function () {
            ipc.send('terminate')
          }
        }, 'Quit')
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

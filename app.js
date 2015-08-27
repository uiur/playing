'use strict'

const React = require('react')
const ipc = require('ipc')

const App = React.createClass({
  getInitialState () {
    return {
      slack: window.localStorage.getItem('slack'),
      hipchat: {
        token: window.localStorage.getItem('hipchat.token'),
        room: window.localStorage.getItem('hipchat.room')
      },
      checked: true
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
        React.DOM.header({
            className: 'header'
          },
          [
            React.DOM.input({
              type: 'checkbox',
              checked: this.state.checked,
              onChange: function () {
                self.setState({ checked: !self.state.checked })
              }
            }),
            React.DOM.span({}, self.state.checked ? 'enabled' : 'disabled')
          ]
        ),

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
        ]),

        React.DOM.div({}, [
          React.DOM.h2({}, 'Hipchat'),
          React.DOM.input({
            className: 'form-control',
            type: 'text',
            placeholder: 'token',
            value: this.state.hipchat.token,
            onChange: function (e) {
              const value = e.target.value

              self.setState(function (state) {
                state.hipchat.token = value
                return state
              })

              window.localStorage.setItem('hipchat.token', e.target.value)
            }
          }),
          React.DOM.input({
            className: 'form-control',
            type: 'text',
            placeholder: 'room',
            value: this.state.hipchat.room,
            onChange: function (e) {
              const value = e.target.value

              self.setState(function (state) {
                state.hipchat.room = value
                return state
              })

              window.localStorage.setItem('hipchat.room', e.target.value)
            }
          })
        ])
      ])
    )
  }
})

React.render(React.createFactory(App)(), document.body)

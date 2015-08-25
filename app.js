'use strict'

const React = require('react')
const ipc = require('ipc')

const App = React.createClass({
  getInitialState () {
    return {
      slack: window.localStorage.getItem('slack'),
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

        React.DOM.div({},
          React.DOM.input({
            className: 'form-control',
            type: 'text',
            placeholder: 'slack',
            value: this.state.slack,
            onChange: function (e) {
              self.setState({ slack: e.target.value })
              window.localStorage.setItem('slack', e.target.value)
            }
          })
        )
      ])
    )
  }
})

React.render(React.createFactory(App)(), document.body)

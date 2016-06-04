import React, { PropTypes, Component } from 'react'
import io from 'socket.io-client'

export default class extends Component {
  static propTypes = {
    subject: PropTypes.string.isRequired
  }

  componentDidMount() {
    const channel = io(`:5000/${this.props.subject}`)
    channel.on('tweet', (tweet) => {
      debugger
    })
  }

  render() {
    return false
  }
}


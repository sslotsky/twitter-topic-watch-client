import React, { PropTypes, Component } from 'react'
import { readAllTweets } from '../actions'
import { connect } from 'react-redux'
import Tweets from './Tweets'

export class Tracker extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    readAll: PropTypes.func.isRequired
  }

  readAll() {
    const { subject, readAll } = this.props
    readAll(subject.name)
    this.scrollTop.scrollTop = 0
  }

  unreadTweets() {
    const { unreadTweets } = this.props.subject
    return (
      <a className='pure-button pure-button-primary' onClick={() => this.readAll()}>
        {`${unreadTweets.length} unread tweets (read more)`}
      </a>
    )
  }

  render() {
    const { name, readTweets } = this.props.subject
    return (
      <div className='tracker'>
        <div className='subject-header'>
          <h2>{name}</h2>
          {this.unreadTweets()}
        </div>
        <div className='tweets' ref={(node) => { this.scrollTop = node }}>
          <Tweets  tweets={readTweets} />
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  { readAll: readAllTweets }
)(Tracker)

import React, { PropTypes, Component } from 'react'
import Tweets from './Tweets'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Tracker extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  readAll() {
    const { subject, actions } = this.props
    actions.readAll(subject.name)
    this.scrollTop.scrollTop = 0
  }

  unreadTweets() {
    const { unreadTweets } = this.props.subject
    return (
      <a className="pure-button pure-button-primary" onClick={() => this.readAll()}>
        {`${unreadTweets.length} unread tweets (read more)`}
      </a>
    )
  }

  render() {
    const { name, readTweets } = this.props.subject
    return (
      <div className="tracker">
        <div className="subject-header">
          <h2>{name}</h2>
          {this.unreadTweets()}
        </div>
        <div className="tweets" ref={(node) => { this.scrollTop = node }}>
          <Tweets tweets={readTweets} />
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    actions: bindActionCreators({
      readAll: actionCreators.readAllTweets
    }, dispatch)
  })
)(Tracker)

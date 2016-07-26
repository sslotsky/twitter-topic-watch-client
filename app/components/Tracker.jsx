import React, { PropTypes, Component } from 'react'
import Tweets from './Tweets'
import * as actions from '../actions'
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

  untrack() {
    const { subject, actions } = this.props
    actions.ignore(subject.name)
  }

  unreadTweets() {
    const { unreadTweets } = this.props.subject
    return (
      <a className="pure-button pure-button-primary" onClick={() => this.readAll()}>
        {`${unreadTweets.length} unread tweets (read more)`}
      </a>
    )
  }

  viewMore() {
    const { subject, actions } = this.props
    actions.viewMore(subject.name)
  }

  render() {
    const { name, readTweets, visibleCount } = this.props.subject
    const readMore = readTweets.length > visibleCount ? (
      <a onClick={() => this.viewMore()}>Read More...</a>
    ) : false

    return (
      <div className="tracker">
        <div className="subject-header">
          <h2>{name}</h2>
          {this.unreadTweets()}
          <a onClick={() => this.untrack()} className='pure-button button-warning'>Untrack</a>
        </div>
        <div className="tweets" ref={(node) => { this.scrollTop = node }}>
          <Tweets tweets={readTweets.slice(0, visibleCount)} />
          {readMore}
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    actions: bindActionCreators({
      readAll: actions.readAllTweets,
      viewMore: actions.viewMoreTweets,
      ignore: actions.ignore
    }, dispatch)
  })
)(Tracker)

import React, { PropTypes, Component } from 'react'
import { readAllTweets, untrackSubject, viewMore } from '../actions'
import { connect } from 'react-redux'

class Tracker extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    readAll: PropTypes.func.isRequired,
    untrack: PropTypes.func.isRequired,
    more: PropTypes.func.isRequired
  }

  static untrack({ untrack, subject: { name } }) {
    untrack(name)
  }

  static viewMore({ more, subject: { name } }) {
    more(name)
  }

  static viewedTweets({ subject: { tweets } }) {
    return tweets.filter(t => t.read)
  }

  static visibleTweets(props) {
    return Tracker.viewedTweets(props).slice(0, props.visibleCount)
  }

  readAll() {
    const { readAll, subject: { name } } = this.props
    readAll(name)
    this.container.scrollTop = 0
  }

  unreadTweets() {
    const { tweets } = this.props.subject
    const unreadCount = tweets.filter(t => !t.read).length
    return (
      <a className='pure-button pure-button-primary' onClick={() => this.readAll()}>
        {`${unreadCount} unread tweets (read more)`}
      </a>
    )
  }

  tweets() {
    const { name } = this.props.subject

    return Tracker.visibleTweets(this.props).map(({ user, text, created_at }, i) =>
      <div key={`${name}-tweets-${i}`}>
        <div className='pure-g'>
          <div className='pure-1-4'>
            <img src={user.profile_image_url} />
          </div>
          <div className='pure-u-1-4'>
            <strong>{user.name}</strong>
          </div>
        </div>
        <p>{text}</p>
        <p>{created_at}</p>
      </div>
    )
  }

  viewMoreLink() {
    if (Tracker.viewedTweets(this.props).length > this.props.subject.visibleCount) {
      return <a onClick={() => Tracker.viewMore(this.props)}>View More...</a>
    }

    return false
  }

  render() {
    const { name } = this.props.subject

    return (
      <div className='tracker'>
        <div className='subject-header'>
          <h2>{name}</h2>
          {this.unreadTweets()}
          <a onClick={() => Tracker.untrack(this.props)} className='pure-button button-warning'>Untrack</a>
        </div>
        <div className='tweets' ref={(node) => this.container = node}>
          {this.tweets()}
          {this.viewMoreLink()}
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  {
    readAll: readAllTweets,
    untrack: untrackSubject,
    more: viewMore,
  }
)(Tracker)

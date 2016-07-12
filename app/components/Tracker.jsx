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

  readAll() {
    const { readAll, subject } = this.props
    readAll(subject.name)
    this.scrollTop.scrollTop = 0
  }

  untrack() {
    const { untrack, subject } = this.props
    untrack(subject.name)
  }

  viewMore() {
    const { more, subject } = this.props
    more(subject.name)
  }

  viewedTweets() {
    const { tweets } = this.props.subject
    return tweets.filter(t => t.read)
  }

  visibleTweets() {
    const { visibleCount } = this.props.subject
    return this.viewedTweets().slice(0, visibleCount)
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

    return this.visibleTweets().map((t, i) =>
      <div key={`${name}-tweets-${i}`}>
        <div className='pure-g'>
          <div className='pure-1-4'>
            <img src={t.user.profile_image_url} />
          </div>
          <div className='pure-u-1-4'>
            <strong>{t.user.name}</strong>
          </div>
        </div>
        <p>{t.text}</p>
        <p>{t.created_at}</p>
      </div>
    )
  }

  viewMoreLink() {
    if (this.viewedTweets().length > this.props.subject.visibleCount) {
      return <a onClick={() => this.viewMore()}>View More...</a>
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
          <a onClick={() => this.untrack()} className='pure-button button-warning'>Untrack</a>
        </div>
        <div className='tweets' ref={(node) => this.scrollTop = node}>
          {this.tweets()}
          {this.viewMoreLink()}
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  { readAll: readAllTweets, untrack: untrackSubject, more: viewMore  }
)(Tracker)

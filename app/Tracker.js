import React, { PropTypes, Component } from 'react'
import { listen, stopTracking, READ_ALL_TWEETS, VIEW_MORE_TWEETS } from './actions'
import { scrollTop } from './utils'

export default class extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(listen(this.props.subject.name))
  }

  componentWillUnmount() {
    this.untrack()
  }

  untrack() {
    this.props.dispatch(stopTracking(this.props.subject.name))
  }

  scrollId() {
    return `subject-${this.props.subject.name}`
  }

  readAll() {
    this.props.dispatch({ type: READ_ALL_TWEETS, subject: this.props.subject.name })
    scrollTop(this.scrollTop, 1500)
  }

  readMore() {
    this.props.dispatch({ type: VIEW_MORE_TWEETS, subject: this.props.subject.name })
  }

  unreadTweets() {
    const { tweets } = this.props.subject
    const unreadCount = tweets.filter(t => !t.read).length
    return (
      <a className='pure-button pure-button-primary' onClick={::this.readAll}>{`${unreadCount} unread tweets (read more)`}</a>
    )
  }

  viewedTweets() {
    const { tweets } = this.props.subject
    return tweets.filter(t => t.read)
  }

  tweets() {
    const { visibleCount } = this.props.subject
    return this.viewedTweets().slice(0, visibleCount)
  }

  readMoreLink() {
    if (this.viewedTweets().length > this.props.subject.visibleCount)
      return <a onClick={::this.readMore}>Read More...</a>

    return false
  }

  render() {
    const { name } = this.props.subject
    return (
      <div className='tracker'>
        <div className='subject-header'>
          <h2>{name}</h2>
          {this.unreadTweets()}
          <a onClick={::this.untrack} className='pure-button button-warning'>Untrack</a>
        </div>
        <div className='tweets' ref={(node) => this.scrollTop = node}>
          {
            this.tweets().map((t, i) => {
              return (
                <div key={`${name}-tweets-${i}`}>
                  <div className='pure-g'>
                    <div className='pure-u-1-8'>
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
            })
          }
          {this.readMoreLink()}
        </div>
      </div>
    )
  }
}

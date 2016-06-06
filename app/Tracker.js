import React, { PropTypes, Component } from 'react'
import { listen, READ_ALL_TWEETS } from './actions'

export default class extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(listen(this.props.subject.name))
  }

  readAll() {
    this.props.dispatch({ type: READ_ALL_TWEETS, subject: this.props.subject.name })
  }

  unreadTweets() {
    const { tweets } = this.props.subject
    const unreadCount = tweets.filter(t => !t.read).length
    return (
      <a className='pure-button pure-button-primary' onClick={::this.readAll}>{`${unreadCount} unread tweets (read more)`}</a>
    )
  }

  render() {
    const { tweets, name } = this.props.subject
    return (
      <div>
        <div>
          <h2>{name}</h2>
          {this.unreadTweets()}
        </div>
        {
          tweets.filter(t => t.read).map((t, i) => {
            return (
              <div key={`${name}-tweets-${i}`}>
                <div className='pure-g'>
                  <div className='pure-u-1-8'>
                    <img src={t.user.profile_image_url} />
                  </div>
                  <div className='pure-u-2-8'>
                    <strong>{t.user.name}</strong>
                  </div>
                </div>
                <p>{t.text}</p>
                <p>{t.created_at}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

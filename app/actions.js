import socket, { channel } from './socket'

export const TRACK_SUBJECT = 'TRACK_SUBJECT'
export const TWEETS_RECEIVED = 'TWEETS_RECEIVED'
export const READ_ALL_TWEETS = 'READ_ALL_TWEETS'

export function trackSubject(subject) {
  return function(dispatch) {
    socket.emit('track', subject)
    return dispatch({ type: TRACK_SUBJECT, subject: subject })
  }
}

export function listen(subject) {
  return function(dispatch) {
    channel(subject).on('tweets', tweets => {
      dispatch({
        type: TWEETS_RECEIVED,
        tweets: tweets,
        subject: subject,
        read: false
      })
    })
  }
}

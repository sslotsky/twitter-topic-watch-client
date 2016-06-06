import socket, { channel } from './socket'

export const TRACK_SUBJECT = 'TRACK_SUBJECT'
export const STOP_TRACKING = 'STOP_TRACKING'
export const TWEETS_RECEIVED = 'TWEETS_RECEIVED'
export const READ_ALL_TWEETS = 'READ_ALL_TWEETS'
export const VIEW_MORE_TWEETS = 'VIEW_MORE_TWEETS'

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

export function stopTracking(subject) {
  return function(dispatch) {
    dispatch({ type: STOP_TRACKING, subject: subject })
    channel(subject).removeAllListeners('tweets')
    socket.emit('untrack', subject)
  }
}

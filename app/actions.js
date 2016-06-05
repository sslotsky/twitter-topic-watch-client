import socket, { channel } from './socket'

export const TRACK_SUBJECT = 'TRACK_SUBJECT'
export const TWEET_RECEIVED = 'TWEET_RECEIVED'

export function trackSubject(subject) {
  return function(dispatch) {
    socket.emit('track', subject)
    return dispatch({ type: TRACK_SUBJECT, subject: subject })
  }
}

export function listen(subject) {
  return function(dispatch) {
    channel(subject).on('tweet', tweet => {
      dispatch({ type: TWEET_RECEIVED, tweet: tweet, subject: subject })
    })
  }
}

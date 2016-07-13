import * as actionTypes from './constants'
import socket, { channel } from './socket'

const dispatchTweets = dispatch => tweets => dispatch({
  type: actionTypes.TWEETS_RECEIVED,
  tweets,
  subject: name,
  read: false
})

export const track = name => ({
  type: actionTypes.TRACK_SUBJECT,
  name
})

export const listen = name => dispatch => {
  dispatch(track(name))

  socket.emit('track', name)
  channel(name).on('tweets', dispatchTweets(dispatch))
}

export function readAllTweets(name) {
  return {
    type: actionTypes.READ_ALL_TWEETS,
    subject: name
  }
}

export function untrackSubject(name) {
  channel(name).removeAllListeners('tweets')
  socket.emit('untrack', name)

  return {
    type: actionTypes.UNTRACK_SUBJECT,
    subject: name
  }
}

export function viewMore(name) {
  return {
    type: actionTypes.VIEW_MORE,
    subject: name
  }
}

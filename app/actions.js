export const TRACK_SUBJECT = 'TRACK_SUBJECT'
import socket from './socket'

export function trackSubject(subject) {
  return function(dispatch) {
    socket.emit('track', subject)
    return dispatch({ type: TRACK_SUBJECT, subject: subject })
  }
}

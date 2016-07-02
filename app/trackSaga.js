import { eventChannel, takeEvery } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects'
import socket, { channel } from './socket'
import * as actionTypes from './constants'

function socketEmitter(subject) {
  return eventChannel(emitter => {
    socket.emit('track', subject)
    const newChannel = channel(subject)

    newChannel.on('tweets', tweets => {
      emitter(tweets)
    })

    return () => {
      newChannel.removeAllListeners('tweets')
      socket.emit('untrack', subject)
    }
  })
}

function* listen(subject) {
  const chan = yield call(socketEmitter, subject)
  try {
    while (true) {
      let tweets = yield take(chan)
      yield put({
        type: actionTypes.TWEETS_RECEIVED,
        subject,
        tweets,
        read: false
      })
    }
  } finally {
    if (yield cancelled())
      chan.close()
  }
}

function* subscribe(action) {
  while (true) {
    const listenTask = yield fork(listen, action.subject)
    const unsubscribed = yield take(actionTypes.STOP_TRACKING)
    if (action.subject == unsubscribed.subject)
      yield cancel(listenTask) 
  }
}

function* track() {
  yield* takeEvery(actionTypes.TRACK_SUBJECT, subscribe)
}

export default track

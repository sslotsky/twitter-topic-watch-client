import * as actionTypes from './constants'

export function track(name) {
  return {
    type: actionTypes.TRACK_SUBJECT,
    name
  }
}

export function readAllTweets(name) {
  return {
    type: actionTypes.READ_ALL_TWEETS,
    name
  }
}

export function viewMoreTweets(name) {
  return {
    type: actionTypes.VIEW_MORE_TWEETS,
    name
  }
}

export function untrackSubject(name) {
  return {
    type: actionTypes.UNTRACK_SUBJECT,
    name
  }
}

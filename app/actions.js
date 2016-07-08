import * as actionTypes from './constants'

export function track(name) {
  return {
    type: actionTypes.TRACK_SUBJECT,
    name
  }
}

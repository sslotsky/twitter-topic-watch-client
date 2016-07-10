import { Map, List } from 'immutable'
import * as actionTypes from './constants'
import resolve from './reduxResolver'

const initialState = Map({
  subjects: List()
})

function trackNewSubject(state, action) {
  const subjects = state.get('subjects')
  if (subjects.some(s => s.get('name') === action.name)) {
    return state
  }

  const subject = Map({ name: action.name, tweets: List(), visibleCount: 50 })
  return state.merge({
    subjects: subjects.push(subject)
  })
}

export default resolve(initialState, {
  [actionTypes.TRACK_SUBJECT]: trackNewSubject
})

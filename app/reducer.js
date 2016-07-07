import { Map, Set } from 'immutable'
import * as actionTypes from './constants'
import createStore from '../storeCreator'

const initialState = Map({
  subjects: Set(),
})

function trackNewSubject(state, action) {
  const subject = Map({
    name: action.name,
    tweets: Set(),
    visibleCount: 50,
  })
  return state.set('subjects', state.get('subjects').add(subject));
}

export default createStore(initialState, {
  [actionTypes.TRACK_SUBJECT]: trackNewSubject,
})

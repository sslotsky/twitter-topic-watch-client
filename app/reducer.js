import { Map, List } from 'immutable'
import createStore from './storeCreator'
import * as actions from './actions'

const initialState = Map({
  subjects: List()
})

function trackNewSubject(state, action) {
  const subjects = state.get('subjects')
  if (subjects.some(s => s.name == action.subject))
    return subjects

  return state.merge({
    subjects: [...subjects, Map({ name: action.subject })]
  })
}

export default createStore(initialState, (state, action) => {
  return {
    [actions.TRACK_SUBJECT]: () => trackNewSubject(state, action)
  }
})

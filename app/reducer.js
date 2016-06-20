import { Map, List } from 'immutable'
import createStore from '../storeCreator'

const initialState = Map({
  subjects: List()
})

function trackNewSubject(state, action) {
  const subjects = state.get('subjects')
  if (subjects.some(s => s.get('name') === action.name))
    return state

  const subject = Map({ name: action.name, tweets: List(), visibleCount: 50 })
  return state.merge({
    subjects: subjects.push(subject)
  })
}

export default createStore(initialState, (state, action) => {
  return {
    'TRACK_SUBJECT': () => trackNewSubject(state, action)
  }
})

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

  const subject = Map({ name: action.subject, tweets: List() })
  return state.merge({
    subjects: [...subjects, subject]
  })
}

function appendTweet(state, action) {
  const subjects = state.get('subjects').map(s => {
    if (s.get('name') != action.subject)
      return s

    return s.merge({
      tweets: [...s.get('tweets'), action.tweet]
    })
  })

  return state.merge({ subjects: subjects })
}

export default createStore(initialState, (state, action) => {
  return {
    [actions.TRACK_SUBJECT]: () => trackNewSubject(state, action),
    [actions.TWEET_RECEIVED]: () => appendTweet(state, action)
  }
})

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

function prependTweets(state, action) {
  const subjects = state.get('subjects').map(s => {
    if (s.get('name') != action.subject)
      return s

    return s.merge({
      tweets: [...action.tweets, ...s.get('tweets')]
    })
  })

  return state.merge({ subjects: subjects })
}

function readAll(state, action) {
  const subjects = state.get('subjects').map(s => {
    if (s.get('name') != action.subject)
      return s

    const tweets = s.get('tweets').map(t => t.merge({
      read: true
    }))

    return s.merge({ tweets: tweets })
  })

  return state.merge({ subjects: subjects })
}

export default createStore(initialState, (state, action) => {
  return {
    [actions.TRACK_SUBJECT]: () => trackNewSubject(state, action),
    [actions.TWEETS_RECEIVED]: () => prependTweets(state, action),
    [actions.READ_ALL_TWEETS]: () => readAll(state, action)
  }
})

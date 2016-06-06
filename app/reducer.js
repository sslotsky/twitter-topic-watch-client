import { Map, List } from 'immutable'
import createStore from './storeCreator'
import * as actions from './actions'

const initialState = Map({
  subjects: List()
})

function mapState(state, action, mutate) {
  return state.get('subjects').map(s => {
    if (s.get('name') != action.subject)
      return s

    return mutate(s)
  })
}

function trackNewSubject(state, action) {
  const subjects = state.get('subjects')
  if (subjects.some(s => s.name == action.subject))
    return subjects

  const subject = Map({ name: action.subject, tweets: List(), visibleCount: 50 })
  return state.merge({
    subjects: [...subjects, subject]
  })
}

function prependTweets(state, action) {
  const subjects = mapState(state, action, (s) => {
    return s.merge({
      tweets: [...action.tweets, ...s.get('tweets')]
    })
  })

  return state.merge({ subjects: subjects })
}

function readAll(state, action) {
  const subjects = mapState(state, action, (s) => {
    const tweets = s.get('tweets').map(t => {
      if (t.read)
        return t

      return t.merge({ read: true })
    })

    return s.merge({ tweets: tweets, visibleCount: 50 })
  })

  return state.merge({ subjects: subjects })
}

function viewMore(state, action) {
  const subjects = mapState(state, action, (s) => {
    return s.merge({ visibleCount: s.get('visibleCount') + 50 })
  })

  return state.merge({ subjects: subjects })
}

function stopTracking(state, action) {
  const subjects = state.get('subjects').filter(s => s.get('name') != action.subject)
  return state.merge({ subjects: subjects })
}

export default createStore(initialState, (state, action) => {
  return {
    [actions.TRACK_SUBJECT]: () => trackNewSubject(state, action),
    [actions.TWEETS_RECEIVED]: () => prependTweets(state, action),
    [actions.READ_ALL_TWEETS]: () => readAll(state, action),
    [actions.VIEW_MORE_TWEETS]: () => viewMore(state, action),
    [actions.STOP_TRACKING]: () => stopTracking(state, action)
  }
})

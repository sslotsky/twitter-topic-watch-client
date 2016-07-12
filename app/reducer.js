import { Map, List } from 'immutable'
import * as actionTypes from './constants'
import resolve from './reduxResolver'

const initialState = Map({
  subjects: List()
})

function mapState(state, action, mutate) {
  return state.get('subjects').map(s => {
    if (s.get('name') !== action.subject) {
      return s
    }

    return mutate(s)
  })
}

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

function prependTweets(state, action) {
  const subjects = mapState(state, action, s => {
    const tweets = action.tweets.map(t =>
      Map(t).merge({ read: false })
    )

    return s.merge({
      tweets: List(tweets).concat(s.get('tweets'))
    })
  })

  return state.merge({ subjects })
}

function readAll(state, action) {
  const subjects = mapState(state, action, s => {
    const tweets = s.get('tweets').map(t => {
      if (t.get('read')) {
        return t
      }

      return t.merge({ read: true })
    })

    return s.merge({ tweets, visibleCount: 50 })
  })

  return state.merge({ subjects })
}

function untrack(state, action) {
  const subjects = state.get('subjects').filter(s => s.get('name') !== action.subject)
  return state.merge({ subjects })
}

function viewMore(state, action) {
  const subjects = mapState(state, action, s =>
    s.merge({ visibleCount: s.get('visibleCount') + 50 })
  )

  return state.merge({ subjects })
}

export default resolve(initialState, {
  [actionTypes.TRACK_SUBJECT]: trackNewSubject,
  [actionTypes.TWEETS_RECEIVED]: prependTweets,
  [actionTypes.READ_ALL_TWEETS]: readAll,
  [actionTypes.UNTRACK_SUBJECT]: untrack,
  [actionTypes.VIEW_MORE]: viewMore
})

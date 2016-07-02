import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import reducer from './app/reducer'
import trackSaga from './app/trackSaga'

import './styles.scss'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(trackSaga)

ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById("app"))


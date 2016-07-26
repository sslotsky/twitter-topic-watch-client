import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import '../styles.scss'

import reducer from './reducer'

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById('app'))


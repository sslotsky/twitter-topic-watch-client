import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './app/reducer'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render((
  <Provider store={store}>
    <div>
      <h1>Twitter Topic Watch</h1>
      <App />
    </div>
  </Provider>
), document.getElementById("app"))


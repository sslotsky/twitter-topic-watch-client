import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './app/reducer'
import './styles.scss'

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById("app"))


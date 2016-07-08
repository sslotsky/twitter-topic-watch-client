import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import '../styles.scss'
import reducer from './reducer.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById('app'))


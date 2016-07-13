import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { listen } from '../actions'
import Tracker from './Tracker'

class App extends Component {
  static propTypes = {
    subjects: PropTypes.object.isRequired,
    listenToSubject: PropTypes.func.isRequired
  }

  static renderTrackers(subjects) {
    return (
      subjects.map((s, i) => {
        const key = `subjects=${i}`
        return (
          <div key={key} className='pure-u-1-5'>
            <Tracker subject={s.toJS()} />
          </div>
        )
      })
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.listenToSubject(this.input.value)
    this.input.value = null
  }

  render() {
    const { subjects } = this.props;

    return (
      <div>
        <div className='header'>
          <h1>Twitter Topic Watch</h1>
          <form className='pure-form' onSubmit={(e) => this.handleSubmit(e)}>
            <input type='text' ref={(node) => this.input = node} />
            &nbsp;
            <button type='submit' className='pure-button pure-button-primary'>Track!</button>
          </form>
        </div>
        <div className='content'>
          <div className='pure-g'>
            {App.renderTrackers(subjects)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subjects: state.get('subjects')
  }
}

export default connect(mapStateToProps, { listenToSubject: listen })(App)

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Tracker from './Tracker'

class App extends Component {
  static propTypes = {
    subjects: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch({ type: 'TRACK_SUBJECT', name: this.input.value })
    this.input.value = null
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1>Twitter Topic Watch</h1>
          <form className='pure-form' onSubmit={::this.handleSubmit}>
            <input type='text' ref={(node) => this.input = node} />
            &nbsp;
            <button type='submit' className='pure-button pure-button-primary'>Track!</button>
          </form>
        </div>
        <div className='content'>
          <div ClassName='pure-g'>
            {
              this.props.subjects.map((s, i) => {
                return (
                  <div key={`subjects=${i}`} className='pure-u-1-5'>
                    <Tracker {...this.props} subject={s.toJS()} />
                  </div>
                )
              })
            }
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

export default connect(mapStateToProps)(App)

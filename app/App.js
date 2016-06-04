import React, { PropTypes, Component } from 'react'
import Tracker from './Tracker'
import { trackSubject } from './actions'
import { connect } from 'react-redux'

class App extends Component {
  static propTypes = {
    subjects: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSubmit(e) {
    e.preventDefault()
    const subject = this.input.value
    this.props.dispatch(trackSubject(subject))
  }

  render() {
    return (
      <div>
        <form onSubmit={::this.handleSubmit}>
          <input type='text' ref={(node) => this.input = node} />
          <input type='submit' value='Submit' />
        </form>
        {
          this.props.subjects.map((s, i) => {
            return (
              <Tracker key={`subjects-${i}`} subject={s.get('name')} />
            )
          })
        }
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

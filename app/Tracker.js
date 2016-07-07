import React, { PropTypes, Component } from 'react'

class Tracker extends Component {
  render() {
    const { name } = this.props.subject
    return (
      <div className='tracker'>
        <h2>{name}</h2>
      </div>
    )
  }
}

Tracker.propTypes = {
  subject: PropTypes.object.isRequired
}

export default Tracker;
import React, { PropTypes } from 'react'

const Tracker = ({ subject: { name } }) => (
  <div className="tracker">
    <h2>{name}</h2>
  </div>
)

Tracker.propTypes = {
  subject: PropTypes.object.isRequired,
}

export default Tracker;

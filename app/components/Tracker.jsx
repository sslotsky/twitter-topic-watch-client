import React, { PropTypes, Component } from 'react'

export default class extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired
  }

  render() {
    const { name } = this.props.subject
    return (
      <div className='tracker'>
        <h2>{name}</h2>
      </div>
    )
  }
}

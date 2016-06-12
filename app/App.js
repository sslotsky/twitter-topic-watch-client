import React, { PropTypes, Component } from 'react'

export default class extends Component {
  handleSubmit(e) {
    e.preventDefault()
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
        </div>
      </div>
    )
  }
}

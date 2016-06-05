import React, { PropTypes, Component } from 'react'
import { listen } from './actions'

export default class extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(listen(this.props.subject.name))
  }

  render() {
    const { tweets, name } = this.props.subject
    return (
      <div>
        {
          tweets.map((t, i) => {
            return (
              <p key={`${name}-tweets-${i}`}>
                {t.text}
              </p>
            )
          })
        }
      </div>
    )
  }
}

import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService'

class LogoutComponent extends Component {
  render() {
    // make sure auth token is destroyed when users logout via url
    AuthenticationService.logout()
    return (
      <>
        <h4>(/¯◡ ‿ ◡)/¯ ~ ┻━┻</h4>
        <p>good bye!</p>
      </>
    )
  }
}

export default LogoutComponent

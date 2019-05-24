import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService'

class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'admin',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    }
    // this.handleUsernameChange = this.handleUsernameChange.bind(this)
    // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginClicked() {
    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        this.props.history.push(`/clients`)
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false })
        this.setState({ hasLoginFailed: true })
      })
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showSuccessMessage && <div>Login Sucessful</div>}

          <div className="form-group col-sm-5 col-md-4 p-2 mx-auto mt-4">
            <div className="form-group">
              User Name:{' '}
              <input
                type="text"
                name="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleChange}
              />
              Password:{' '}
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-outline-primary" onClick={this.loginClicked}>
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginComponent

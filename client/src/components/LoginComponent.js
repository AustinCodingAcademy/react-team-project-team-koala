import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService'
//import withRouter from 're'
class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'admin',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    }

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
        this.props.history.push(`/appointments`)
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
              {/* <form> */}
              <label>{'Username:'}</label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="form-control"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label>{'Password:'}</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button className="btn btn-outline-primary" onClick={this.loginClicked}>
                Login
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginComponent

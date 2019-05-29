import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

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
        this.props.history.push(`/home`)
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false })
        this.setState({ hasLoginFailed: true })
      })
  }

  render() {
    return (
      <>
        {this.state.hasLoginFailed && (
          <div className="alert alert-warning">Invalid Credentials</div>
        )}

        <div className="p-g form-group">
          <div className="p-inputgroup mb-2">
            {/* OPTIMIZE: add mixin function for icon addon */}
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <InputText
              placeholder="Username"
              type="text"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="p-inputgroup mb-2">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock" />
            </span>
            <InputText
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autocomplete=""
            />
          </div>
          <Button label="sign in" onClick={this.loginClicked} />
          <Button label="register" className="ml-2 p-button-secondary" />
        </div>
      </>
    )
  }
}

export default LoginComponent

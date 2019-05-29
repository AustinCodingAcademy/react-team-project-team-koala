import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService'
import Dashboard from '../Pages/Dashboard'

class Home extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    const whoisLoggedIn = AuthenticationService.getLoggedInUserName()

    return (
      <div className="p-grid">
        <div className="p-col-12">
          <span style={{ color: '#44444420' }}>
            user: <span>{whoisLoggedIn}</span>
          </span>
          <div className="card">
            <h1>Home</h1>
            {whoisLoggedIn == 'admin' && <Dashboard />}
          </div>
        </div>
      </div>
    )
  }
}
export default Home

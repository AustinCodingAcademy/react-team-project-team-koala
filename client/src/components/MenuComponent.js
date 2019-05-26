import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService'
import Icon from './Icon'

class MenuComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    return (
      <>
        <div className="navbar-container">
          <nav className="navbar navbar-expand-sm py-3 bg-primary-3" style={{}}>
            <Link
              className="navbar-brand"
              to="/"
              style={{
                fontWeight: 'bold',
                color: '#fff',
                padding: '0 10px',
                zIndex: 0,
                fontSize: '2em'
              }}
            >
              pet
            </Link>
          </nav>
          <nav
            className="navbar navbar-expand-sm navbar-toggled-show navbar-dark p-0 bg-primary sticky-top"
            style={{ zIndex: 100, borderTop: '2px solid rgba(255,255,255,.05)' }}
          >
            <div
              className="collapse navbar-collapse"
              style={{ zIndex: 20000 }}
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav mr-auto p-0">
                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/clients">
                      clients
                    </Link>
                  </li>
                )}
                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/pets">
                      pets
                    </Link>
                  </li>
                )}
                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/appointments">
                      appointments
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="navbar-nav ml-auto">
              {/* LOGIN LINK (show only if user is not logged in) */}
              {!isUserLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <Icon type="icon-login" textBefore="Login" />
                  </Link>
                </li>
              )}
              {/* LOGOUT LINK (show only if user is logged in) */}
              {isUserLoggedIn && (
                <div className="nav-item dropdown px-3">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="drop2"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {AuthenticationService.getLoggedInUserName()}
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="drop2"
                    style={{ marginLeft: '-5rem', position: 'absolute' }}
                  >
                    <Link className="dropdown-item" to="/profile">
                      <Icon type="icon-user-circle-o" textAfter="Profile" />
                      {/* TODO: create simple Profile page */}
                    </Link>
                    <Link className="dropdown-item" to="/settings">
                      <Icon type="icon-cog" textAfter="Settings" />
                      {/* TODO: create simple Settings page */}
                    </Link>
                    <div className="dropdown-divider" />
                    <Link
                      className="dropdown-item"
                      to="/logout"
                      title="logout"
                      onClick={AuthenticationService.logout}
                    >
                      <Icon type="icon-logout" textAfter="Sign out" />
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      </>
    )
  }
}

export default withRouter(MenuComponent)

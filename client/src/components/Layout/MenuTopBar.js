import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { TieredMenu } from 'primereact/tieredmenu'
import { Toolbar } from 'primereact/toolbar'
import { Link } from 'react-router-dom'
import AuthenticationService from '../../service/AuthenticationService'

const items = [
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user'
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog'
  },
  {
    separator: true
  },
  {
    label: 'Tables',
    icon: 'pi pi-table',
    url: '/tables',
    items: [
      {
        label: 'pets',
        url: '/pets'
      },
      {
        label: 'clients',
        url: '/clients'
      },
      {
        label: 'appointments',
        url: '/appointments'
      }
    ]
  },
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-th-large',
    url: '/admin/dashboard'
  },
  {
    separator: true
  },
  {
    label: 'Sign out',
    icon: 'pi pi-fw pi-sign-out',
    url: '/logout'
  }
]
// FIXME: TieredMenu dropdown to show when page is scrolled down
class MenuTopBar extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    const whoisLoggedIn = AuthenticationService.getLoggedInUserName()

    return (
      <Toolbar style={{ position: 'fixed', top: 0, zIndex: 1000, width: '100%' }}>
        <div className="p-col-12">
          <div className="p-toolbar-group-left nav-admin">
            <TieredMenu model={items} popup={true} ref={el => (this.menu = el)} />
            {isUserLoggedIn && (
              <Button icon="pi pi-ellipsis-h" onClick={event => this.menu.toggle(event)} />
            )}
            <Link to="./home">
              <Button icon="pi pi-home" />
            </Link>
          </div>
          {isUserLoggedIn && (
            <div className="p-toolbar-group-right nav-user">
              <TieredMenu
                popup={true}
                onClick={event => this.menu.toggle(event)}
                style={{ zIndex: 1000 }}
              />
              <Button
                label={whoisLoggedIn}
                icon="pi pi-user"
                onClick={event => this.menu.toggle(event)}
              />
            </div>
          )}
          {!isUserLoggedIn && (
            <Link to="./login">
              <Button icon="pi pi-sign-in" />
            </Link>
          )}
        </div>
      </Toolbar>
    )
  }
}

export default MenuTopBar

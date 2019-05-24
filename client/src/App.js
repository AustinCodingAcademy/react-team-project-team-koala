import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import LoginComponent from './components/LoginComponent'
import LogoutComponent from './components/LogoutComponent'
import MenuComponent from './components/MenuComponent'
import ListClients from './components/Clients/ListClients'
import ClientComponent from './components/Clients/ClientComponent'
import PetComponent from './components/Pets/PetComponent'
import ListPets from './components/Pets/ListPets'
import ListAppointments from './components/Appointments/ListAppointments'
import AppointmentComponent from './components/Appointments/AppointmentComponent'
import AuthenticatedRoute from './components/AuthenticatedRoute'

import Example from './components/Form/App'
import Signup from './components/Signup/Signup'
// import Home from './components/Pages/Home'
import Svglist from './components/Icon/Svg'

class App extends React.Component {
  render() {
    return (
      <div style={{ background: '#fff' }}>
        <Router>
          <MenuComponent />

          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            {/* <Route path="/*" exact component={LoginComponent} /> */}
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/logout" exact component={LogoutComponent} />
            <Route path="/example" exact component={Example} />
            <Route path="/sign-up" exact component={Signup} />
            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
            <AuthenticatedRoute path="/clients" exact component={ListClients} />
            <AuthenticatedRoute path="/pets" exact component={ListPets} />
            <AuthenticatedRoute path="/appointments" exact component={ListAppointments} />
            <AuthenticatedRoute path="/clients/:id" component={ClientComponent} />
            <AuthenticatedRoute path="/pets/:id" component={PetComponent} />
            <AuthenticatedRoute path="/appointments/:id" component={AppointmentComponent} />
          </Switch>
        </Router>

        <div className="row d-flex col-12 justify-content-end">
          <div className="justify-space-between d-flex bg-light text-right">
            {/* shortcut for logging in when api session zaps */}
            <a class="btn btn-sm bg-white" href="/login">
              {Svglist.refresh()}
            </a>
          </div>
        </div>
        <div
          className="mt-5 p-3"
          style={{
            background: '#FF8E88',
            overflow: 'hidden',
            top: 0,
            zIndex: '-1',
            overflowY: 'hidden',
            minHeight: '10vh'
          }}
        >
          put stuff here
        </div>
      </div>
    )
  }
}
export default App

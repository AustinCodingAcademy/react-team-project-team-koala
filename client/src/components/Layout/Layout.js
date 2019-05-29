import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginComponent from '../LoginComponent'
import LogoutComponent from '../LogoutComponent'

import Admin from '../Pages/Admin'
import AppointmentComponent from '../Appointments/AppointmentComponent'
import AuthenticatedRoute from '../AuthenticatedRoute'
import ClientComponent from '../Clients/ClientComponent'
import Dashboard from '../Pages/Dashboard'
import Example from '../Form/App'
import Home from './Home'
import ListAppointments from '../Appointments/ListAppointments'
import ListClients from '../Clients/ListClients'
import ListPets from '../Pets/ListPets'
import Page404 from './Page404'
import PetComponent from '../Pets/PetComponent'
import Signup from '../Signup/Signup'
import Tables from '../Pages/Tables'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './Layout.css'
class Layout extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/logout" exact component={LogoutComponent} />
          <Route path="/example" exact component={Example} />
          <Route path="/signup" exact component={Signup} />
          <AuthenticatedRoute path="/admin" exact component={Admin} />
          <AuthenticatedRoute path="/admin/dashboard" exact component={Dashboard} />
          <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
          <AuthenticatedRoute path="/tables" exact component={Tables} />
          <AuthenticatedRoute path="/clients" exact component={ListClients} />
          <AuthenticatedRoute path="/pets" exact component={ListPets} />
          <AuthenticatedRoute path="/appointments" exact component={ListAppointments} />
          <AuthenticatedRoute path="/clients/:id" component={ClientComponent} />
          <AuthenticatedRoute path="/pets/:id" component={PetComponent} />
          <AuthenticatedRoute path="/appointments/:id" component={AppointmentComponent} />
          <Route component={Page404} />
        </Switch>
      </Router>
    )
  }
}
export default Layout

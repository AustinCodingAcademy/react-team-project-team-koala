import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginComponent from '../LoginComponent'
import LogoutComponent from '../LogoutComponent'

import Admin from '../Pages/Admin'
import AppointmentComponent from '../Appointments/AppointmentComponent'
import AuthenticatedRoute from '../AuthenticatedRoute'
import ClientComponent from '../Clients/ClientComponent'
import Dashboard from '../Pages/Dashboard'
import UserProfile from '../Form/UserForm'
import Home from './Home'
import ListAppointments from '../Appointments/ListAppointments'
import ListClients from '../Clients/ListClients'
import ListPets from '../Pets/ListPets'
import Page404 from './Page404'
import PetComponent from '../Pets/PetComponent'
import Signup from '../Pages/Signup'
import Tables from '../Pages/Tables'

import 'primereact/resources/primereact.min.css'
// import 'primereact/resources/themes/nova-colored/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './Layout.css'
import '../../layout/layout.css'

class Layout extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/logout" exact component={LogoutComponent} />

          <Route path="/signup" exact component={Signup} />
          <AuthenticatedRoute path="/profile" exact component={UserProfile} />
          <AuthenticatedRoute path="/home" exact component={Home} />
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

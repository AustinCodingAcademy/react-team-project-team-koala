import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Pet from './views/pets';
import Client from './views/clients';
import Appointment from './views/appointments';
import * as serviceWorker from './serviceWorker'

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/appointments" component={Appointment} />
      <Route path="/clients" component={Client} />
      <Route path="/pets" component={Pet} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

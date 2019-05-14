import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './app.css';
import './bulma.min.css'

class App extends React.Component {
  render() {
    return (
      <div id="main">
        <section class="hero is-light">
          <div class="hero-body">
            <div class="container has-text-centered">
             <h1 class="title"> Pet Clinic </h1>
             <h2 class="subtitle"> Subtitle </h2>
           </div>
         </div>
          <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
              <div class="container">
                <ul class="na">
                  <li><Link to="/home">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/pets">Pets</Link></li>
                    <li><Link to="/appointments">Appointments</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </section>

        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/clients" component={Clients}/>
            <Route path="/pets" component={Pets}/>
            <Route path="/appointments" component={Appointments}/>
            <Route path="*" component={Home}/>
          </Switch>
        </main>

      </div>
    );
  }
};

class Home extends React.Component {
  render() {
    return (
      <div>
        home(put login stuff here maybe??)
      </div>
    );
  }
};

class Clients extends React.Component {
  render() {
    return (
      <div>
        clients
      </div>
    );
  }
};

class Pets extends React.Component {
  render() {
    return (
      <div>
        <p>Pets</p>

      </div>
    );
  }
};

class Appointments extends React.Component {
  render() {
    return (
      <div>
        <p>Appointments</p>
      </div>
    );
  }
};

// ref https://segmentfault.com/q/1010000009616045/a-1020000009618728
render((
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
), document.querySelector('#app'));

source:
[github.com/ruanyf/webpack-demos](github.com/ruanyf/webpack-demos)

---
Some command-line options you should know.

webpack – building for development
webpack -p – building for production (minification)
webpack --watch – for continuous incremental building
webpack -d – including source maps
webpack --colors – making building output pretty

---

## Demo15: React router ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo15))

This demo uses webpack to build [React-router](https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md)'s official example.

Let's imagine a little app with a dashboard, inbox, and calendar.

```
+---------------------------------------------------------+
| +---------+ +-------+ +--------+                        |
| |Dashboard| | Inbox | |Calendar|      Logged in as Jane |
| +---------+ +-------+ +--------+                        |
+---------------------------------------------------------+
|                                                         |
|                        Dashboard                        |
|                                                         |
|                                                         |
|   +---------------------+    +----------------------+   |
|   |                     |    |                      |   |
|   | +              +    |    +--------->            |   |
|   | |              |    |    |                      |   |
|   | |   +          |    |    +------------->        |   |
|   | |   |    +     |    |    |                      |   |
|   | |   |    |     |    |    |                      |   |
|   +-+---+----+-----+----+    +----------------------+   |
|                                                         |
+---------------------------------------------------------+
```

webpack.config.js

```javascript
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
    ]
  }
};
```

index.js

```javascript
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="/app">Dashboard</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/app" component={Dashboard}/>
            <Route path="/inbox" component={Inbox}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="*" component={Dashboard}/>
          </Switch>
        </main>
      </div>
    );
  }
};

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
};

class Inbox extends React.Component {
  render() {
    return (
      <div>
        <p>Inbox</p>
      </div>
    );
  }
};

class Calendar extends React.Component {
  render() {
    return (
      <div>
        <p>Calendar</p>
      </div>
    );
  }
};

render((
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
), document.querySelector('#app'));
```

index.html

```html
<html>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</htmL>
```

Launch the server.

```bash
$ npm run dev
```

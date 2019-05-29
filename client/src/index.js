import React from 'react'

import { render } from 'react-snapshot'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

render(
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

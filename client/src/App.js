import React from 'react'
import Layout from './components/Layout/Layout'
import MenuTopBar from './components/Layout/MenuTopBar'
import './layout/layout.css'

class App extends React.Component {
  render() {
    return (
      <div className="layout-wrapper">
        <div className="layout-main">
          <MenuTopBar />
          <div className="py-4">hi</div>
          <Layout />
        </div>
      </div>
    )
  }
}
export default App

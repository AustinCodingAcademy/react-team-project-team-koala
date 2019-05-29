import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Tables extends Component {
  render() {
    return (
      <>
        <div className="card">
          tables:
          <h1 value="tables" />
          <ul>
            <li>
              <Link to="/pets">{'pets'}</Link>
            </li>
            <li>
              <Link to="/clients">{'clients'}</Link>
            </li>
            <li>
              <Link to="/appointments">{'appointments'}</Link>
            </li>
          </ul>
        </div>
      </>
    )
  }
}
export default Tables

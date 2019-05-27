import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../Icon'
import Svglist from '../Icon/Svg'
import AuthenticationService from '../../service/AuthenticationService'

const api = new ApiService('clients')
const TABLE = api.getTable()

class ListClients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      message: ''
    }
    this.deleteClicked = this.deleteClicked.bind(this)
    this.updateClicked = this.updateClicked.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  get header() {
    const headers = { Authorization: 'Basic ' + sessionStorage.getItem('token') }
  }

  refresh() {
    api.retrieveAll().then(response => {
      this.setState({ clients: response.data })
    })
  }

  deleteClicked(id) {
    let isLoggedIn = AuthenticationService.isUserLoggedIn()

    if (isLoggedIn) {
      api.delete(id).then(response => {
        this.setState({ message: 'Deleted' })
      })
    }
    this.refresh()
  }

  addClicked() {
    this.props.history.push(`/${TABLE}/-1`)
  }

  updateClicked(id) {
    console.log(`update ${id}`)
    this.props.history.push(`/clients/${id}`)
    this.refresh()
  }

  render() {
    console.log('render')
    return (
      <div>
        <h3>Clients</h3>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

        <table className="table table-sm table-profile">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone#</th>
              <th>Address</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map(client => (
              <tr key={client.id}>
                <td name="id">{client.id}</td>
                <td name="name">{client.name}</td>
                <td name="phone#">{client.phoneNumber}</td>
                <td name="address">{client.address}</td>
                <td name="email">{client.email}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn" onClick={() => this.updateClicked(client.id)}>
                    {Svglist.edit()}
                  </button>
                  <button
                    name="delete"
                    table="clients"
                    className="btn btn-transparent p-0"
                    onClick={() => this.deleteClicked(client.id)}
                  >
                    <Icon type="icon-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-sm btn-outline-primary"
              tablename="clients"
              onClick={this.addClicked}
            >
              <Icon type="icon-plus" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListClients

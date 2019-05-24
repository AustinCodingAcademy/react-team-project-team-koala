import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../Icon'

const api = new ApiService('clients')
const TABLE = api.getTable()

class ListClients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      message: null
    }
    this.deleteClicked = this.deleteClicked.bind(this)
    this.updateClicked = this.updateClicked.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    api.retrieveAll().then(response => {
      this.setState({ clients: response.data })
    })
  }

  deleteClicked(id) {
    api.delete(id).then(response => {
      this.setState({ message: 'Deleted' })
      this.refresh()
    })
  }

  addClicked() {
    this.props.history.push(`/${TABLE}/-1`)
  }

  updateClicked(id) {
    console.log(`update ${id}`)
    this.props.history.push(`/clients/${id}`)
  }

  render() {
    console.log('render')
    return (
      <div className="container-fluid mt-3">
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
                <td style={{ borderLeft: '1px solid #ddd' }}>
                  <button
                    name="update"
                    className="btn btn-sm btn-transparent p-0"
                    onClick={() => this.updateClicked(client.id)}
                  >
                    <Icon type="icon-pencil" />
                  </button>
                  <button
                    name="delete"
                    className="btn btn-sm btn-transparent p-0"
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
            <button className="btn btn-sm btn-outline-primary" tablename="clients" onClick={this.addClicked}>
              <Icon type="icon-plus" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListClients

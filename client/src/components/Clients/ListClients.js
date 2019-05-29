import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../../components/Icon'

import { Thead, Caption } from '../Table/Table'

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

  refresh() {
    api.retrieveAll().then(response => {
      this.setState({ clients: response.data })
    })
  }

  deleteClicked(id) {
    api.delete(id)
    // FIXME: correctly return promise for api.delete(id) - client, pet, and apt
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    this.setState({ message: 'Deleted' }) // not accurate
    this.props.history.push(`/${TABLE}`)
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
      <div className="container">
        <table className="table" table="clients">
          <Caption title={TABLE} side="top" />
          <Thead arr={['id', 'name', 'phone#', 'address', 'email', '']} />
          <tbody className="tbody">
            {this.state.clients.map(client => (
              <tr key={client.id}>
                <td name="id">{client.id}</td>
                <td name="name">{client.name}</td>
                <td name="phone#">{client.phoneNumber}</td>
                <td name="address">{client.address}</td>
                <td name="email">{client.email}</td>
                <td key="edit" name="edit">
                  <button
                    className="btn"
                    id={client.id}
                    onClick={() => this.updateClicked(client.id)}
                  >
                    <Icon icon="icon-pencil" name="update" />
                  </button>
                  <button
                    className="btn"
                    id={client.id}
                    onClick={() => this.deleteClicked(client.id)}
                  >
                    <Icon icon="icon-trash" name="delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Caption side={'bottom'}>
            {this.state.message && <div className="alert">{this.state.message || ''}</div>}
          </Caption>
        </table>
        <button onClick={this.addClicked}>add new</button>
      </div>
    )
  }
}

export default ListClients

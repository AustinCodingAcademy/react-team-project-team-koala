import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Bytesize from '../../common/Bytesize'
import { Thead, Caption } from '../Table/Table'

const api = new ApiService('appointments')
const TABLE = api.getTable()

class ListAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: [],
      message: ''
    }
    this.deleteClicked = this.deleteClicked.bind(this)
    this.updateClicked = this.updateClicked.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    console.log(nextProps)
    console.log(nextState)
    return true
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    api.retrieveAll().then(response => {
      this.setState({ appointments: response.data })
    })
  }

  deleteClicked(id) {
    api.delete(id)
    this.setState({ message: 'Deleted' })
    this.props.history.push(`/${TABLE}`)
    this.refresh()
  }

  addClicked() {
    this.props.history.push(`/${TABLE}/-1`)
  }

  updateClicked(id) {
    console.log(`update ${id}`)
    this.props.history.push(`/${TABLE}/${id}`)
    this.refresh()
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.message || '') && (
          <div className="alert alert-success">{this.state.message || ''}</div>
        )}

        <table className="table" table="appointments">
          <Caption title={TABLE} side={'top'} />
          <Thead arr={['id', 'petId', 'date', 'type', 'reason', '']} />
          <tbody className="tbody">
            {this.state.appointments.map(appointment => (
              <tr key={appointment.id}>
                <td key="id" name="id">
                  {appointment.id}
                </td>
                <td key="petId" name="petId">
                  {appointment.petId}
                </td>
                <td name="date" key="date" value={appointment.date}>
                  {appointment.date}
                </td>
                <td key="type" name="type" value={appointment.type}>
                  {appointment.type}
                </td>
                <td key="reason" name="reason" value={appointment.reason}>
                  {appointment.reason}
                </td>
                <td key="edit" name="edit">
                  <Bytesize
                    icon="edit"
                    name="update"
                    onClick={() => this.updateClicked(appointment.id)}
                  />
                  <Bytesize
                    icon="trash"
                    name="delete"
                    onClick={() => this.deleteClicked(appointment.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <Caption side={'bottom'}>
            {this.state.message && <div className="alert">{this.state.message || ''}</div>}
          </Caption>
        </table>
        <button onClick={this.addClicked}>add new</button>
      </React.Fragment>
    )
  }
}

export default ListAppointments

import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../Icon'

const api = new ApiService('appointments')
const TABLE = api.getTable()

class ListAppointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fields: [],
      message: null
    }
    this.deleteClicked = this.deleteClicked.bind(this)
    this.updateClicked = this.updateClicked.bind(this)
    this.addClicked = this.addClicked.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
    this.fields()
  }

  refresh() {
    api.retrieveAll().then(response => {
      this.setState({ data: response.data })
    })
  }

  fields() {
    api.fields().then(response => {
      this.setState({ fields: response.data })
    })
    this.refresh()
  }

  deleteClicked(id) {
    api.delete(id).then(response => {
      this.setState({ message: `Delete of appointment ${id} Successful` })
      this.refresh()
    })
  }

  addClicked() {
    this.props.history.push(`/${TABLE}/-1`)
  }

  updateClicked(id) {
    console.log(`update ${id}`)
    this.props.history.push(`/${TABLE}/${id}`)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
        <div className="container-fluid mt-3">
          <h3 style={{ textTransform: 'capitalize', border: 0 }}>{TABLE}</h3>

          <table className="table table-sm table-profile">
            <thead style={{ border: '1px solid white' }}>
              {this.state.fields.map(field => (
                <th>{field}</th>
              ))}
            </thead>
            <tbody>
              {this.state.data.map(dat => (
                <>
                  <tr key={dat.id}>
                    {/* TODO: iterate over this.state.fields to return table columns */}
                    {/* <td>{dat[this.state.fields[0]]}</td> */}
                    {this.state.fields.length >= 0 && <td name={this.state.fields[0]}>{dat[this.state.fields[0]]}</td>}
                    {this.state.fields.length > 1 && <td name={this.state.fields[1]}>{dat[this.state.fields[1]]}</td>}
                    {this.state.fields.length > 2 && <td name={this.state.fields[2]}>{dat[this.state.fields[2]]}</td>}
                    {this.state.fields.length > 3 && <td name={this.state.fields[3]}>{dat[this.state.fields[3]]}</td>}
                    {this.state.fields.length > 4 && <td name={this.state.fields[4]}>{dat[this.state.fields[4]]}</td>}
                    {this.state.fields.length > 5 && <td name={this.state.fields[5]}>{dat[this.state.fields[5]]}</td>}
                    {this.state.fields.length > 6 && <td name={this.state.fields[6]}>{dat[this.state.fields[6]]}</td>}

                    <td style={{ borderLeft: '1px solid #ddd' }}>
                      <button className="btn btn-sm btn-transparent p-0" onClick={() => this.updateClicked(dat.id)}>
                        <Icon type="icon-pencil" />
                      </button>
                      <button className="btn btn-sm btn-transparent p-0" onClick={() => this.deleteClicked(dat.id)}>
                        <Icon type="icon-trash" />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          <div className="row mt-2">
            <div className="col">
              <button className="btn btn-sm btn-outline-primary" tablename="appointments" onClick={this.addClicked}>
                <Icon type="icon-plus" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ListAppointments

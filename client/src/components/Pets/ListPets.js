import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../Icon'

const api = new ApiService('pets')
const TABLE = api.getTable()

class ListPets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
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
      this.setState({ data: response.data })
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
    this.props.history.push(`/${TABLE}/${id}`)
    this.refresh()
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid mt-3">
          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
          <h3 style={{ textTransform: 'capitalize', border: 0 }}>{TABLE}</h3>
          <table className="table table-sm table-profile">
            <thead>
              <tr>
                <th>Id</th>
                <th>Pet</th>
                <th>Client</th>

                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(dat => (
                <>
                  <tr key={dat.id}>
                    <td name="id">#{dat.id}</td>
                    <td>
                      {/* <span name="name">
                        <Icon type="icon-id-card-o" text={dat.name} />
                      </span> */}
                      <span name="gender">
                        {dat.gender !== null ? (
                          dat.gender === 'M' ? (
                            <Icon type="icon-male" color="blue" />
                          ) : (
                            <Icon type="icon-female" color="pink" />
                          )
                        ) : (
                          '..'
                        )}
                      </span>
                      {dat.name}
                    </td>
                    <td name="TODO:">
                      <Icon type="icon-user-circle-o" />
                      {dat.clientId}
                    </td>

                    <td style={{ borderLeft: '1px solid #ddd' }}>
                      <button
                        name="update"
                        className="btn btn-sm btn-transparent p-0"
                        onClick={() => this.updateClicked(dat.id)}
                      >
                        <Icon type="icon-pencil" />
                      </button>
                      <button
                        name="delete"
                        className="btn btn-sm btn-transparent p-0"
                        onClick={() => this.deleteClicked(dat.id)}
                      >
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
              <button className="btn btn-sm btn-outline-primary" tablename="pets" onClick={this.addClicked}>
                <Icon type="icon-plus" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ListPets

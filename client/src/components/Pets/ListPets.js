import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../../components/Icon/Icon'
import { Thead, Caption } from '../Table/Table'

const api = new ApiService('pets')
const TABLE = api.getTable()

class ListPets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
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
      this.setState({ pets: response.data })
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
        <table className="table" table="pets">
          <Caption title={TABLE} side={'top'} />
          <Thead arr={['id', 'pet', 'client', '']} />
          <tbody className="tbody">
            {this.state.pets.map(pet => (
              <tr key={pet.id}>
                <td key="id" name="petId">
                  {pet.id}
                </td>
                <td name="gender" key="gender" value={pet.gender}>
                  {pet.gender !== null && (
                    <>
                      <Icon
                        icon={pet.gender === 'M' ? 'icon-male' : 'icon-female'}
                        color={pet.gender === 'M' ? 'blue' : 'pink'}
                      />
                      <span>{pet.name}</span>
                    </>
                  )}
                </td>
                <td key="clientId" name="clientId" value={pet.clientId}>
                  <Icon icon="icon-user-circle-o" text={pet.clientId} />
                  <span>{pet.clientId}</span>
                </td>
                <td key="edit" name="edit">
                  <button className="btn" id={pet.id} onClick={() => this.updateClicked(pet.id)}>
                    <Icon icon="icon-pencil" name="update" />
                  </button>
                  <button className="btn" id={pet.id} onClick={() => this.deleteClicked(pet.id)}>
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
      </React.Fragment>
    )
  }
}

export default ListPets

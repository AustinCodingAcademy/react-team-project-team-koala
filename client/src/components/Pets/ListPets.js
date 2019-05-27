import React, { Component } from 'react'
import ApiService from '../../service/ApiService'
import Icon from '../Icon'
import Bytesize from '../../common/Bytesize'
import { Thead, TableCaption } from '../Table/Table'

const api = new ApiService('pets')
const TABLE = api.getTable()

class ListPets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      message: null
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
    // api.delete(id).then(response => {
    //   this.setState({ message: 'Deleted' })
    // })
    api.delete(id)

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
        <div className="container-fluid mt-3">
          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <table className="table" table="pets">
              <TableCaption title={TABLE} side={'top'} />
              <Thead arr={['id', 'pet', 'client', '']} />
              <tbody className="tbody">
                {this.state.pets.map(pet => (
                  <>
                    <tr key={pet.id}>
                      <td key="id" name="petId">
                        {pet.id}
                      </td>
                      <td name="gender" key="gender" value={pet.gender}>
                        {pet.gender !== null && (
                          <Icon
                            type={pet.gender === 'M' ? 'icon-male' : 'icon-female'}
                            color={pet.gender === 'M' ? 'blue' : 'pink'}
                            text={pet.name}
                          />
                        )}
                      </td>
                      <td key="clientId">
                        <Bytesize
                          icon="user"
                          onClick={() => this.deleteClicked(pet.id)}
                          text={pet.clientId}
                          size="sm"
                        />
                        <Icon type="icon-user-circle-o" text={pet.clientId} />
                      </td>
                      <td key="edit">
                        <Bytesize icon="edit" onClick={() => this.updateClicked(pet.id)} />
                        <Bytesize icon="trash" onClick={() => this.deleteClicked(pet.id)} />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
              <caption style={{ background: 'rgba(0,0,0,.05)' }}>
                <Bytesize icon="plus" onClick={this.addClicked} />
              </caption>
            </table>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ListPets

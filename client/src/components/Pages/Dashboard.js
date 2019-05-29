import React, { Component } from 'react'

import { Button } from 'primereact/button'
import { Chart } from 'primereact/chart'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'

import ApiService from '../../service/ApiService'

const petCols = [
  { field: 'id', header: 'id' },
  { field: 'name', header: 'name' },
  { field: 'gender', header: 'gender' },
  { field: 'clientId', header: 'client id' }
]

const clientCols = [
  { field: 'id', header: 'id' },
  { field: 'name', header: 'name' },
  { field: 'phoneNumber', header: 'phoneNumber' },
  { field: 'address', header: 'address' },
  { field: 'email', header: 'email' }
]

const apptCols = [
  { field: 'id', header: 'id' },
  { field: 'petId', header: 'petId' },
  { field: 'date', header: 'date' },
  { field: 'type', header: 'type' },
  { field: 'reason', header: 'reason' }
]

class PetTable extends Component {
  constructor() {
    super()
    this.state = {
      pets: []
    }
    this.petservice = new ApiService('pets')
  }

  refresh() {
    this.petservice.retrieveAll().then(response => {
      this.setState({ pets: response.data })
    })
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    var cols = petCols
    let dynamicColumns = cols.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />
    })
    return <DataTable value={this.state.pets}>{dynamicColumns}</DataTable>
  }
}

class ClientTable extends Component {
  constructor() {
    super()
    this.state = {
      client: []
    }
    this.dataservice = new ApiService('clients')
  }

  refresh() {
    this.dataservice.retrieveAll().then(response => {
      this.setState({ data: response.data })
    })
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    var cols = clientCols
    let dynamicColumns = cols.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />
    })
    return <DataTable value={this.state.data}>{dynamicColumns}</DataTable>
  }
}

class ApptTable extends Component {
  constructor(props, table) {
    super()
    this.state = {
      data: []
    }
    this.dataservice = new ApiService('appointments')
  }

  refresh() {
    this.dataservice.retrieveAll().then(response => {
      this.setState({ data: response.data })
    })
  }

  componentDidMount() {
    this.refresh()
  }

  render() {
    var cols = apptCols
    let dynamicColumns = cols.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />
    })
    return <DataTable value={this.state.data}>{dynamicColumns}</DataTable>
  }
}

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    }
  }

  render() {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-md-8 p-lg-6">
          <Panel header="Pets">
            <div className="p-grid">
              <div className="p-col-12" />
              <PetTable />
            </div>
          </Panel>
        </div>

        <div className="p-col-12 p-md-8 p-lg-6 p-fluid ">
          <Panel header="Appointments">
            <div className="p-grid">
              <div className="p-col-12" />
              <ApptTable />
            </div>
          </Panel>
        </div>

        <div className="p-col-12 p-md-8 p-lg-6 p-fluid ">
          <Panel header="Clients">
            <div className="p-grid">
              <div className="p-col-12" />
              <ClientTable />
            </div>
          </Panel>
        </div>

        <div className="p-col-12 p-md-4 p-fluid ">
          <Panel header="Clients">
            <div className="p-grid">
              <div className="p-col-12" />
              <div className="p-col-12">
                <InputText type="text" placeholder="Name" />
              </div>
              <div className="p-col-12">
                <InputText type="text" placeholder="Message" />
              </div>
              <div className="p-col-12">
                <Button type="button" label="Send" icon="fa-send" />
              </div>
            </div>
          </Panel>
        </div>

        <div className="p-col-12 p-lg-6">
          <div className="card">
            <Chart type="line" data={this.state.lineData} />
          </div>
        </div>
        <div className="p-col-12 p-lg-8">
          {/* TODO: install calendar plugin */}
          <Panel header="Calendar" style={{ height: '100%' }} />
        </div>
      </div>
    )
  }
}
export default Dashboard

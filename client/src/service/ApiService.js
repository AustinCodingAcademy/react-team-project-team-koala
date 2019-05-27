import axios from 'axios'

const URL = 'http://localhost:8080/api'
const headers = { Authorization: 'Basic ' + sessionStorage.getItem('token') }
let config = { headers: headers }

class ApiService {
  constructor(table) {
    this.table = table
  }

  getTable() {
    return this.table
  }

  retrieveAll() {
    return axios.get(`${URL}/${this.table}`, config)
  }

  fields() {
    return axios.get(`${URL}/${this.table}/fields`, config)
  }

  retrieve(id) {
    return axios.get(`${URL}/${this.table}/${id}`, config)
  }

  delete(id) {
    // delete the data
    axios.delete(`${URL}/${this.table}/${id}`, config)
    // then send promise back to calling function
    return axios.get(`${URL}/${this.table}`)
  }

  update(name, id, data) {
    return axios.put(`${URL}/${name}/${id}`, data, config)
  }

  create(name, data) {
    return axios.post(`${URL}/${name}`, data, config)
  }
}

export default ApiService

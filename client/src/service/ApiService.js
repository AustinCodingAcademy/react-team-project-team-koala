import axios from 'axios'

const URL = 'http://localhost:8080/api'
const headers = { Authorization: 'Basic ' + sessionStorage.getItem('token') }

class ApiService {
  constructor(table) {
    this.table = table
  }

  getTable() {
    return this.table
  }

  retrieveAll() {
    return axios.get(`${URL}/${this.table}`, { headers })
  }

  fields() {
    return axios.get(`${URL}/${this.table}/fields`, { headers })
  }

  retrieve(id) {
    return axios.get(`${URL}/${this.table}/${id}`, { headers })
  }

  delete(id) {
    axios.delete(`${URL}/${this.table}/${id}`, { headers })
    return axios.get(`${URL}/${this.table}`)
  }

  update(name, id, data) {
    return axios.put(`${URL}/${name}/${id}`, { ...data, ...headers })
  }

  create(name, data) {
    return axios.post(`${URL}/${name}`, { ...data, ...headers })
  }
}

export default ApiService

import axios from 'axios'

const URL = 'http://localhost:8080/api'

class ApiService {
  constructor(table) {
    this.table = table
  }

  getTable() {
    return this.table
  }

  retrieveAll() {
    return axios.get(`${URL}/${this.table}`)
  }

  fields() {
    return axios.get(`${URL}/${this.table}/fields`)
  }

  retrieve(id) {
    return axios.get(`${URL}/${this.table}/${id}`)
  }

  delete(id) {
    axios.delete(`${URL}/${this.table}/${id}`)
    return axios.get(`${URL}/${this.table}`)
  }

  update(name, id, data) {
    return axios.put(`${URL}/${name}/${id}`, data)
  }

  create(name, data) {
    return axios.post(`${URL}/${name}`, data)
  }
}

export default ApiService

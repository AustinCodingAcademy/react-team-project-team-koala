import axios from 'axios'

const API_URL = 'http://localhost:8080'
const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: { authorization: this.createBasicAuthToken(username, password) }
    })
  }

  createBasicAuthToken(username, password) {
    // sessionStorage.setItem('token', window.btoa(username + ':' + password))
    // return 'Basic ' + sessionStorage.getItem('token')
    return 'Basic ' + window.btoa(username + ':' + password)
  }

  registerSuccessfulLogin(username, password) {
    //sessionStorage.setItem('authenticatedUser', username)
    sessionStorage.setItem('token', window.btoa(username + ':' + password))
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return user
  }

  sendHeader(token) {
    axios.defaults.headers.common['Authorization'] = token
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      config => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = token
        }
        return config
      },
      function(error) {
        return Promise.reject(error.response)
        // https://github.com/axios/axios/issues/960#issuecomment-320659373
      }
    )
  }
}

export default new AuthenticationService()

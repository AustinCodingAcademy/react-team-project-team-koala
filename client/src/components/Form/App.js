import React, { Component } from 'react'
import validation from './validation'
import DynamicForm from './DynamicForm'

class App extends Component {
  render() {
    const fields = [
      { label: 'First Name', type: 'input', name: 'firstName', value: null },
      { label: 'Last Name', type: 'input', name: 'lastName', value: null },
      { label: 'Phone #', type: 'input', name: 'phoneNumber', value: null },
      { label: 'Email', type: 'input', name: 'email', value: null },
      { label: 'Address', type: 'input', name: 'address', value: null },
      { label: 'City', type: 'input', name: 'city', value: 'Austin' }

      // {
      //   label: 'Occupation',
      //   type: 'select',
      //   data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'],
      //   name: 'occupation',
      //   value: 'Please Select'
      // },

      // { label: 'Agree to Terms & Conditions', type: 'checkbox', name: 'terms', value: false }
    ]
    return <DynamicForm fields={fields} validation={validation} />
  }
}

export default App

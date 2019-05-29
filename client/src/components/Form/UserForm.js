import React, { Component } from 'react'
import validation from './validation'
import { Formik, Field } from 'formik'
import './Form.css'
import AuthenticationService from '../../service/AuthenticationService'

// TODO: style form

class DynamicForm extends Component {
  renderFields(inputs) {
    return inputs.map(input => {
      return (
        <Field
          name={input.name}
          value={input.value}
          render={props => {
            const { field } = props
            return (
              <>
                <label>{input.label}</label>
                <input
                  {...field}
                  key={input.name}
                  class={'p-inputtext p-component p-filled'}
                  type="text"
                />
              </>
            )
          }}
        />
      )
    })
  }
  getInitialValues(inputs) {
    const initialValues = {}
    // get already filled out form values
    inputs.forEach(field => {
      if (!initialValues[field.name]) {
        initialValues[field.name] = field.value || ''
      }
    })
    return initialValues
  }
  render() {
    const initialValues = this.getInitialValues(this.props.fields)
    return (
      <>
        <Formik
          onSubmit={values => {
            console.log(values)
          }}
          validationSchema={this.props.validation}
          initialValues={initialValues}
          render={form => {
            const errorMessageShow = Object.keys(form.errors).length === 0 ? 'error' : 'notnull'
            return <form onSubmit={form.handleSubmit}>{this.renderFields(this.props.fields)}</form>
          }}
        />
        <hr />
        <button type="submit" className="p-button p-component">
          <span className="p-button-text p-c">Save</span>
        </button>
      </>
    )
  }
}

class UserForm extends Component {
  render() {
    const whoisLoggedIn = AuthenticationService.getLoggedInUserName()
    const fields = [
      { label: 'Username', type: 'input', name: 'username', value: whoisLoggedIn },
      { label: 'First Name', type: 'input', name: 'firstName', value: null },
      { label: 'Last Name', type: 'input', name: 'lastName', value: null },
      { label: 'Phone #', type: 'input', name: 'phoneNumber', value: null },
      { label: 'Email', type: 'input', name: 'email', value: null },
      { label: 'Address', type: 'input', name: 'address', value: null },
      { label: 'City', type: 'input', name: 'city', value: 'Austin' }
    ]
    return <DynamicForm fields={fields} validation={validation} />
  }
}

export default UserForm

import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ApiService from '../../service/ApiService'

const api = new ApiService('clients')
const TABLE = api.getTable()

class ClientComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      phoneNumber: this.props.match.params.phoneNumber,
      address: this.props.match.params.address,
      email: this.props.match.params.email
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
      return
    }

    api.retrieve(this.state.id).then(response =>
      this.setState({
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address,
        email: response.data.email
      })
    )
  }

  validate(values) {
    let errors = {}
    if (!values.name) {
      errors.name = 'Cannot be blank'
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Cannot be blank'
    }
    if (!values.address) {
      errors.address = 'Cannot be blank'
    }
    if (!values.email) {
      errors.email = 'Cannot be blank'
    }
    return errors
  }

  onSubmit(values) {
    const tablename = TABLE

    const client = {
      id: this.state.id,
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email
    }

    if (this.state.id === -1) {
      api.create(tablename, client).then(() => this.props.history.push('/clients'))
    } else {
      api.update(tablename, this.state.id, client).then(() => this.props.history.push('/clients'))
    }
    console.log(values)
  }

  render() {
    let { id, name, phoneNumber, address, email } = this.state

    return (
      <>
        <div className="container">
          <Formik
            initialValues={{
              id,
              name,
              phoneNumber,
              address,
              email
            }}
            onSubmit={this.onSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <br />
                {/* hide input when id is -1 */
                id > 0 && (
                  <fieldset className="form-group">
                    <label>Id</label>
                    <Field className="form-control" type="text" name="id" disabled />
                  </fieldset>
                ) /****************************/}
                <fieldset className="form-group" key={this.id}>
                  <label>name</label>
                  <Field className="form-control" type="text" name="name" />
                  <ErrorMessage name="name" component="div" className="form-validation" />
                </fieldset>

                <fieldset className="form-group" key={this.id}>
                  <label>phone number</label>
                  <Field className="form-control" type="text" name="phoneNumber" />
                  <ErrorMessage name="phoneNumber" component="div" className="form-validation" />
                </fieldset>
                <fieldset className="form-group" key={this.id}>
                  <label>address</label>
                  <Field className="form-control" type="text" name="address" />
                  <ErrorMessage name="address" component="div" className="form-validation" />
                </fieldset>
                <fieldset className="form-group" key={this.id}>
                  <label>email</label>
                  <Field className="form-control" type="text" name="email" />
                  <ErrorMessage name="email" component="div" className="form-validation" />
                </fieldset>
                <button className="col btn-primary btn btn-sm" type="submit" onSubmit={this.onSubmit}>
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    )
  }
}

export default ClientComponent

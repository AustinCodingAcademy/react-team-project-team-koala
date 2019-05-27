import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ApiService from '../../service/ApiService'

const api = new ApiService('pets')
const TABLE = api.getTable()

class PetComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      name: this.props.match.params.name,
      gender: this.props.match.params.gender,
      clientId: this.props.match.params.clientId
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
        gender: response.data.gender,
        clientId: response.data.clientId
      })
    )
  }

  validate(values) {
    // TODO: form validation for pets
    const errors = {}
    // errors.name = values.name ? '' : 'Cannot be blank'
    // errors.gender = values.gender ? '' : 'Cannot be blank'
    // errors.clientId = values.clientId ? '' : 'Cannot be blank'

    return errors
  }

  onSubmit(values) {
    const tablename = TABLE

    const pet = {
      id: this.state.id,
      name: values.name,
      gender: values.gender,
      clientId: values.clientId
    }

    if (this.state.id === -1) {
      api.create(tablename, pet).then(() => this.props.history.push('/pets'))
    } else {
      api.update(tablename, this.state.id, pet).then(() => this.props.history.push('/pets'))
    }

    console.log(values)
  }

  render() {
    const { id, name, gender, clientId } = this.state

    return (
      <>
        <div>
          <Formik
            initialValues={{
              id,
              name,
              gender,
              clientId
            }}
            onSubmit={this.onSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                {/* https://reactjs.org/docs/forms.html */}
                <br />

                {/* hide input when id is -1 */
                id > 0 && (
                  <fieldset>
                    <label>Id</label>
                    <Field type="text" name="id" disabled />
                  </fieldset>
                )}
                <fieldset key={this.id} name="id">
                  <label>Name</label>
                  <Field type="text" name="name" />
                </fieldset>
                <ErrorMessage name="name" component="div" />
                <fieldset key={this.gender} name="gender">
                  {/* TODO: create select input for gender: M, F */}
                  <label>Gender</label>
                  <Field type="text" name="gender" />
                </fieldset>
                <ErrorMessage name="gender" component="div" />
                <fieldset key={this.clientId}>
                  <label>Client Id</label>
                  <Field type="text" name="clientId" />
                </fieldset>
                <ErrorMessage name="clientId" component="div" />
                <button
                  className="col btn-primary btn btn-sm"
                  type="submit"
                  name="save"
                  onSubmit={this.onSubmit}
                >
                  {'Save'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    )
  }
}

export default PetComponent

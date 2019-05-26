import React, { Component, Fragment } from 'react'
import { Formik, Field } from 'formik'
import './Form.css'

class DynamicForm extends Component {
  renderCheckBox(input) {
    return (
      <Fragment key={input.name}>
        <label>{input.label}</label>
        <Field
          name={input.name}
          render={prop => {
            const { field } = prop
            return <input name={input.name} type="checkbox" checked={field.value} onChange={field.onChange} />
          }}
        />
      </Fragment>
    )
  }

  renderTextArea(input) {
    return (
      <Fragment key={input.name}>
        <label>{input.label}</label>
        <div>
          <Field
            name={input.name}
            render={props => {
              const { field } = props
              const { errors, touched } = props.form
              const hasError = errors[input.name] && touched[input.name] ? 'hasError' : ''
              return (
                <div>
                  <textarea {...field} id={hasError} />
                </div>
              )
            }}
          />
        </div>
      </Fragment>
    )
  }

  renderSelect(input) {
    return (
      <Fragment key={input.name}>
        <label>{input.label}</label>
        <div>
          <Field
            name={input.name}
            render={props => {
              const { field } = props
              const { errors, touched } = props.form
              const hasError = errors[input.name] && touched[input.name] ? 'hasError' : ''
              const defaultOption = (
                <option key="default" value="Please Select">
                  Please Select
                </option>
              )
              const options = input.data.map(i => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))
              const selectOptions = [defaultOption, ...options]
              return (
                <div className="dropdown">
                  <select value={field.value} {...field} id={hasError}>
                    {selectOptions}
                  </select>
                </div>
              )
            }}
          />
        </div>
      </Fragment>
    )
  }
  renderFields(inputs) {
    return inputs.map(input => {
      if (input.type === 'select') {
        return this.renderSelect(input)
      }
      if (input.type === 'checkbox') {
        return this.renderCheckBox(input)
      }
      if (input.type === 'textarea') {
        return this.renderTextArea(input)
      }
      return (
        <div
          key={input.name}
          className="d-flex flex-column justify-content-center"
          style={{ width: '70vw', margin: 'auto' }}
        >
          <div className="form-group m-1 " style={{ margin: 'auto' }}>
            <label>{input.label}</label>
            <Field
              name={input.name}
              render={props => {
                const { field } = props
                const { errors, touched } = props.form
                const hasError = errors[input.name] && touched[input.name] ? 'hasError' : ''
                return <input {...field} id={hasError} type="text" className="form-control" />
              }}
            />
          </div>
        </div>
      )
    })
  }
  getInitialValues(inputs) {
    //declare an empty initialValues object
    const initialValues = {}
    //loop loop over fields array
    //if prop does not exit in the initialValues object,
    // pluck off the name and value props and add it to the initialValues object;
    inputs.forEach(field => {
      if (!initialValues[field.name]) {
        initialValues[field.name] = field.value
      }
    })
    //return initialValues object
    return initialValues
  }
  render() {
    const initialValues = this.getInitialValues(this.props.fields)
    return (
      <>
        <div id="form" className="bg-light px-5 pt-3 pb-5 border border-primary">
          <Formik
            onSubmit={values => {
              console.log(values)
            }}
            validationSchema={this.props.validation}
            initialValues={initialValues}
            render={form => {
              const errorMessageShow = Object.keys(form.errors).length > 0 ? 'error' : 'hidden'
              return (
                <div className="row">
                  <div className="col">
                    <form onSubmit={form.handleSubmit} className="">
                      {this.renderFields(this.props.fields)}
                    </form>
                  </div>
                </div>
              )
            }}
          />
        </div>
        <div className="w-100">
          {' '}
          <button type="submit" className="btn btn-sm btn-primary col-12 rounded-0">
            Submit
          </button>
        </div>
      </>
    )
  }
}
export default DynamicForm

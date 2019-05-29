import React, { useState, Fragment } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

// TODO: this page needs to be styled

const intialState = {
  name: '',
  email: '',
  password: ''
}
const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
})
function MyComponent(props) {
  const [user, setUser] = useState(intialState)
  return (
    <div>
      <Fragment>
        <Formik
          initialValues={user}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            setUser(values)
            setTimeout(() => {
              actions.setSubmitting(false)
            }, 2000)
          }}
          validationSchema={userSchema}
        >
          {props =>
            !props.isSubmitting ? (
              <form onSubmit={props.handleSubmit}>
                <Field
                  name="name"
                  onChange={props.handleChange}
                  value={props.values.name}
                  type="text"
                  placeholder="Name"
                />
                <Field
                  type="password"
                  onChange={props.handleChange}
                  name="password"
                  value={props.values.password}
                  placeholder="Password"
                />
                <Field
                  type="email"
                  placeholder="Email"
                  onChange={props.handleChange}
                  name="email"
                  value={props.values.email}
                />

                <button
                  type="submit"
                  disabled={!props.dirty && props.isSubmitting}
                  className=" mt-2 col btn btn-warning"
                >
                  Submit
                </button>
                {/* TODO: create tooltips for prop errors */}
                {
                  <ul>
                    {props.errors.email && props.touched.email ? <li>{props.errors.email}</li> : ''}
                    {props.errors.password && props.touched.password ? (
                      <li>{props.errors.password}</li>
                    ) : (
                      ''
                    )}
                    {props.errors.name && props.touched.name ? <li>{props.errors.name}</li> : ''}
                  </ul>
                }
              </form>
            ) : (
              <div />
            )
          }
        </Formik>
      </Fragment>
    </div>
  )
}

export default MyComponent

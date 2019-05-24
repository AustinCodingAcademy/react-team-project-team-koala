import React, { useState, Fragment } from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'

// https://github.com/anshulgoyal15/Formik-Blog

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
    <div className="bg-primary p-5">
      <Fragment>
        {/* <span className="form-group col">{JSON.stringify(user, null, 2)}</span> */}
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
              <form onSubmit={props.handleSubmit} className="container col-6 ">
                <Field
                  name="name"
                  onChange={props.handleChange}
                  value={props.values.name}
                  type="text"
                  placeholder="Name"
                  className="form-control mb-1"
                />
                <Field
                  type="password"
                  onChange={props.handleChange}
                  name="password"
                  value={props.values.password}
                  placeholder="Password"
                  className="form-control mb-1"
                />
                <Field
                  type="email"
                  placeholder="Email"
                  onChange={props.handleChange}
                  name="email"
                  value={props.values.email}
                  className="form-control mb-1"
                />

                <button
                  type="submit"
                  disabled={!props.dirty && props.isSubmitting}
                  className=" mt-2 col btn btn-warning"
                >
                  Submit
                </button>
                {/* TODO: create tooltips for prop errors */}
                {/* <ul className="row">
                  {props.errors.email && props.touched.email ? <li>{props.errors.email}</li> : ''}
                  {props.errors.password && props.touched.password ? <li>{props.errors.password}</li> : ''}
                  {props.errors.name && props.touched.name ? <li>{props.errors.name}</li> : ''}
                </ul> */}
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

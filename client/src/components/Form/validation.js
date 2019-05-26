import * as Yup from 'yup'

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/
const alphaNum = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/

const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(alpha, { message: 'Enter Valid Name', excludeEmptyString: true })
    .required()
    .min(2)
    .max(15),
  lastName: Yup.string()
    .matches(alpha, { message: 'Enter Valid Name', excludeEmptyString: true })
    .required()
    .min(2)
    .max(15)
})

export default validation

// import * as Yup from 'yup'
// export const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/
// export const alphaNum = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/
// const validation = Yup.object().shape({
//   companyName: Yup.string()
//     .matches(alphaNum, { message: 'Enter Valid Name', excludeEmptyString: true })
//     .required()
//     .max(35),
//   companyName2: Yup.string()
//     .matches(alphaNum, { message: 'Enter Valid Name', excludeEmptyString: true })
//     .max(35),
//   addressLine1: Yup.string()
//     .matches(alphaNum, { message: 'Alphanumeric characters only', excludeEmptyString: true })
//     .required('required')
//     .max(35),
//   addressLine2: Yup.string()
//     .matches(alphaNum, { message: 'Alphanumeric characters only', excludeEmptyString: true })
//     .max(40),
//   county: Yup.string()
//     .test('county', 'cannot be empty', value => value !== 'Please Select')
//     .required('required'),
//   town: Yup.string()
//     .matches(alpha, { message: 'Alphabet characters only', excludeEmptyString: true })
//     .max(35),
//   country: Yup.string()
//     .matches(alpha, { excludeEmptyString: true })
//     .required('required'),
//   message: Yup.string()
//     .matches(alpha, { excludeEmptyString: true })
//     .required('required')
// })

// export default validation

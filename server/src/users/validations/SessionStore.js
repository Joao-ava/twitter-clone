import * as Yup from 'yup'

import validation from '#app/core/middlewares/validation.js'

const SessionStore = validation(Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
}))

export default SessionStore

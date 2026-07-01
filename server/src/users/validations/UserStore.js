import * as Yup from 'yup'

import validation from '#app/core/middlewares/validation.js'

const UserStore = validation(Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().min(8),
}))

export default UserStore

import * as Yup from 'yup'

import validation from '#app/core/middlewares/validation.js'

const UserUpdate = validation(Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email()
    .required(),
  username: Yup.string(),
  bio: Yup.string(),
  oldPassword: Yup.string().nullable(),
  password: Yup.string()
    .when('oldPassword', ([oldPassword], field) =>
      oldPassword ? field.min(8).required() : field.nullable()
    ),
  confirmPassword: Yup.string().when('password', ([password], field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
}))

export default UserUpdate

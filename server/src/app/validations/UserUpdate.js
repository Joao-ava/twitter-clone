import * as Yup from 'yup';

export default async function UserUpdate(req, res, next) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      bio: Yup.string(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // console.log('ddd');

    await schema.validate(req.body, { abortEarly: true });

    return next();
  } catch (err) {
    // console.log('eee');
    return res
      .status(400)
      .json({ error: 'Erro de validação', messages: err.inner });
  }
}

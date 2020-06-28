import * as Yup from 'yup';

export default async function UserStore(req, res, next) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().min(8),
    });

    await schema.validate(req.body, { abortEarly: true });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Erro de validação', messages: err.inner });
  }
}

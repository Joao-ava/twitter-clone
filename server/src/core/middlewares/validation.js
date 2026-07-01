/**
 * Make a validation middleware
 * @param {import("yup").Schema} schema 
 * @returns {(request: import("express").Request, response: import("express").Response, next: import("express").NextFunction) => Promise<import("express").NextFunction>}
 */
const validation = (schema) => {
  return async (request, response, next) => {
    try {
      await schema.validate(request.body, { abortEarly: false });

      return next();
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Erro de validação', messages: err.inner });
    }
  }
}

export default validation

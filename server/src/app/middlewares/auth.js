import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não provido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // console.log('aaa');
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log('bbb');

    req.userId = decoded.id;

    return next();
  } catch (err) {
    // console.log('ccc');
    return res.status(401).json({ error: 'Token invalido' });
  }
}

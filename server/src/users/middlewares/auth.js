import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '#app/config/auth.js';

/**
 * Get JWT token from request
 * @param {import('express')} request 
 * @returns {string} token
 */
function getToken(request) {
  const cookieToken = request.cookies?.token
  if (cookieToken) return cookieToken

  const authHeader = request.headers.authorization
  if (!authHeader) return ''

  const [, token] = authHeader.split(' ')
  return token
}

/**
 * Requeries authentication
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 * @returns {Promise<import('express').NextFunction>}
 */
export default async function auth(request, response, next) {
  const token = getToken(request);
  if (!token) {
    return response.status(401).json({ error: 'Token não provido' });
  }
  
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalido' });
  }
}

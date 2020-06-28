import { Router } from 'express';

// controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// validations
import SessionStore from './app/validations/SessionStore';
import UserStore from './app/validations/UserStore';
import UserUpdate from './app/validations/UserUpdate';

// middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionStore, SessionController.store);
routes.post('/user', UserStore, UserController.store);

routes.use(authMiddleware);

routes.put('/user', UserUpdate, UserController.update);

export default routes;

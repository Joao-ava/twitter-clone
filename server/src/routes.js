import { Router } from 'express';

// controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FollowingController from './app/controllers/FollowingController';
import FollowerController from './app/controllers/FollowerController';

// validations
import SessionStore from './app/validations/SessionStore';
import UserStore from './app/validations/UserStore';
import UserUpdate from './app/validations/UserUpdate';

// middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionStore, SessionController.store);
routes.post('/user', UserStore, UserController.store);

routes.get('/user/:id/follower', FollowerController.index);
routes.get('/user/:id/following', FollowingController.index);

routes.use(authMiddleware);

routes.put('/user', UserUpdate, UserController.update);

routes.post('/user/:id/following', FollowingController.store);
routes.delete('/user/:id/following', FollowingController.delete);

export default routes;

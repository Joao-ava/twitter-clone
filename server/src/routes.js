import { Router } from 'express';

// controllers
import SessionController from './users/controllers/SessionController';
import UserController from './users/controllers/UserController';
import FollowingController from './users/controllers/FollowingController';
import FollowerController from './users/controllers/FollowerController';
import TwitterController from './app/controllers/TwitterController';
import LikeController from './app/controllers/LikeController';

// validations
import SessionStore from './users/validations/SessionStore';
import UserStore from './users/validations/UserStore';
import UserUpdate from './users/validations/UserUpdate';

// middlewares
import authMiddleware from './users/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionStore, SessionController.store);
routes.post('/user', UserStore, UserController.store);

routes.get('/user/:id/follower', FollowerController.index);
routes.get('/user/:id/following', FollowingController.index);
routes.get('/user/:id/twitter', TwitterController.index);

routes.use(authMiddleware);

routes.put('/user', UserUpdate, UserController.update);

routes.post('/user/:id/following', FollowingController.store);
routes.delete('/user/:id/following', FollowingController.delete);

routes.post('/twitter', TwitterController.store);
routes.post('/twitter/:id/like', LikeController.store);

export default routes;

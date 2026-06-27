import { Router } from 'express';

// controllers
import SessionController from '#app/users/controllers/SessionController.js';
import UserController from '#app/users/controllers/UserController.js';
import FollowingController from '#app/users/controllers/FollowingController.js';
import FollowerController from '#app/users/controllers/FollowerController.js';
import TwetterController from '#app/tweets/controllers/TwetterController.js';
import LikeController from '#app/tweets/controllers/LikeController.js';

// validations
import SessionStore from '#app/users/validations/SessionStore.js';
import UserStore from '#app/users/validations/UserStore.js';
import UserUpdate from '#app/users/validations/UserUpdate.js';

// middlewares
import authMiddleware from '#app/users/middlewares/auth.js';

const routes = new Router();

routes.post('/session', SessionStore, SessionController.store);
routes.post('/user', UserStore, UserController.store);

routes.get('/user/:id/follower', FollowerController.index);
routes.get('/user/:id/following', FollowingController.index);
routes.get('/user/:id/twetter', TwetterController.index);

routes.use(authMiddleware);

routes.put('/user', UserUpdate, UserController.update);

routes.post('/user/:id/following', FollowingController.store);
routes.delete('/user/:id/following', FollowingController.delete);

routes.post('/twetter', TwetterController.store);
routes.post('/twetter/:id/like', LikeController.store);
routes.delete('/twetter/:id/like', LikeController.delete);

export default routes;

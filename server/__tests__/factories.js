import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/users/entities/User';
import UserFollower from '../src/users/entities/UserFollower';
import Twitter from '../src/app/models/Twitter';
import LikeUser from '../src/app/models/LikeUser';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

factory.define('Twitter', Twitter, {
  content: faker.lorem.words(),
});

factory.define('LikeUser', LikeUser, {});

factory.define('UserFollower', UserFollower, {});

export default factory;

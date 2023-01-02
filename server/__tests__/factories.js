import faker from '@faker-js/faker';
import { factory } from 'factory-girl';

import User from '../src/users/entities/User';
import UserFollower from '../src/users/entities/UserFollower';
import Twetter from '../src/tweets/entities/Twetter';
import LikeUser from '../src/tweets/entities/LikeUser';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

factory.define('Twetter', Twetter, {
  likes: faker.datatype.number(),
  content: faker.lorem.words(),
});

factory.define('LikeUser', LikeUser, {});

factory.define('UserFollower', UserFollower, {});

export default factory;

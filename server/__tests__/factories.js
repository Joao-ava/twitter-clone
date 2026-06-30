import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

import User from '#app/users/entities/User.js';
import UserFollower from '#app/users/entities/UserFollower.js';
import Twetter from '#app/tweets/entities/Twetter.js';
import LikeUser from '#app/tweets/entities/LikeUser.js';

factory.define('User', User, {
  name: faker.person.fullName(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

factory.define('Twetter', Twetter, {
  likes: faker.number.int(),
  content: faker.lorem.words(),
});

factory.define('LikeUser', LikeUser, {});

factory.define('UserFollower', UserFollower, {});

export default factory;

import { faker } from '@faker-js/faker';
import MockUser from '../mocks/entities/MockUser.js';

const makeUser = () => new MockUser({
  name: faker.person.fullName(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

export default makeUser;

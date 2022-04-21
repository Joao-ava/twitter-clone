import faker from '@faker-js/faker';
import MockUser from '../mocks/entities/MockUser';

const makeUser = () => new MockUser({
  name: faker.name.findName(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

export default makeUser;

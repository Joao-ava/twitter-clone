import faker from '@faker-js/faker';

const makeSignUpParam = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  password: faker.internet.password(),
});

export default makeSignUpParam;

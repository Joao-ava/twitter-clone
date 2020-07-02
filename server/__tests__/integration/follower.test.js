import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('follower', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return 200', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get(`/user/${user.id}/follower`)
      .send();
    expect(response.status).toBe(200);
  });

  it('should user not exist', async () => {
    const response = await request(app)
      .get('/user/8/follower')
      .send();
    expect(response.status).toBe(404);
  });

  it('should return array', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get(`/user/${user.id}/follower`)
      .send();
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should have 3 followers', async () => {
    const user = await factory.create('User');
    const followerOne = await factory.create('User', {
      email: faker.internet.email(),
    });
    const followerTwo = await factory.create('User', {
      email: faker.internet.email(),
    });
    const followerThree = await factory.create('User', {
      email: faker.internet.email(),
    });

    await user.addFollowers(followerOne);
    await user.addFollowers(followerTwo);
    await user.addFollowers(followerThree);

    const response = await request(app)
      .get(`/user/${user.id}/follower`)
      .send();
    expect(response.body.length).toBe(3);
  });
});

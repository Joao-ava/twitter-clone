import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Like', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should no have twitte', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post(`/twitter/${faker.random.number()}/like`)
      .set('Authorization', `bearer ${user.generateToken()}`)
      .send();
    expect(response.status).toBe(404);
  });

  it('should alredy have like for twitte', async () => {
    const user = await factory.create('User');
    const twitter = await factory.create('Twitter', {
      user_id: user.id,
    });
    await factory.create('LikeUser', {
      user_id: user.id,
      twitter_id: twitter.id,
    });

    const response = await request(app)
      .post(`/twitter/${twitter.id}/like`)
      .set('Authorization', `bearer ${user.generateToken()}`)
      .send();
    expect(response.status).toBe(200);
  });

  it('should like user create', async () => {
    const user = await factory.create('User');
    const twitter = await factory.create('Twitter', {
      user_id: user.id,
    });

    const response = await request(app)
      .post(`/twitter/${twitter.id}/like`)
      .set('Authorization', `bearer ${user.generateToken()}`)
      .send();
    expect(response.status).toBe(201);
  });
});

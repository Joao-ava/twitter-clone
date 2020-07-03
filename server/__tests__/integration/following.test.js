import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Following', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Following other user', () => {
    it('should no have user', async () => {
      const user = await factory.create('User', {
        id: 1,
      });
      const otherUserId = 42;
      const response = await request(app)
        .post(`/user/${otherUserId}/following`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(404);
    });

    it('should user valite', async () => {
      const user = await factory.create('User');
      const otherUser = await factory.create('User', {
        email: faker.internet.email(),
      });
      const response = await request(app)
        .post(`/user/${otherUser.id}/following`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(200);
    });
  });

  describe('Unfollower other user', () => {
    it('no have user', async () => {
      const user = await factory.create('User', {
        id: 1,
      });
      const otherUserId = 42;
      const response = await request(app)
        .delete(`/user/${otherUserId}/following`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(404);
    });

    it('should user valite', async () => {
      const user = await factory.create('User');
      const otherUser = await factory.create('User', {
        email: faker.internet.email(),
      });
      const response = await request(app)
        .delete(`/user/${otherUser.id}/following`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(200);
    });
  });

  describe('list followings', () => {
    it('should no have user', async () => {
      const otherUser = await factory.create('User', {
        email: faker.internet.email(),
      });
      const { id } = otherUser;
      await otherUser.destroy();

      const response = await request(app)
        .get(`/user/${id}/following`)
        .send();
      expect(response.status).toBe(404);
    });

    it('should user exist', async () => {
      const otherUser = await factory.create('User', {
        email: faker.internet.email(),
      });
      const response = await request(app)
        .get(`/user/${otherUser.id}/following`)
        .send();
      expect(response.status).toBe(200);
    });

    it('should return array', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/following`)
        .send();
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should user no have following', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/following`)
        .send();
      expect(response.body.length).toBe(0);
    });

    it('should user have two followings', async () => {
      const user = await factory.create('User');
      const otherUserOne = await factory.create('User', {
        email: faker.internet.email(),
      });
      const otherUserTwo = await factory.create('User', {
        email: faker.internet.email(),
      });
      await user.addFollowings(otherUserOne);
      await user.addFollowings(otherUserTwo);

      const response = await request(app)
        .get(`/user/${user.id}/following`)
        .send();
      expect(response.body.length).toBe(2);
    });
  });
});

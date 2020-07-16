import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Twitter', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('index', () => {
    it('should return twitters from user', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/twitter`)
        .send();
      expect(response.status).toBe(200);
    });

    it('should have tree', async () => {
      const user = await factory.create('User');
      await factory.create('Twitter', {
        user_id: user.id,
      });
      await factory.create('Twitter', {
        user_id: user.id,
      });
      await factory.create('Twitter', {
        user_id: user.id,
      });
      const response = await request(app)
        .get(`/user/${user.id}/twitter`)
        .send();
      expect(response.body.length).toBe(3);
    });

    it('should return array', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/twitter`)
        .send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('store', () => {
    it('should not authenticated', async () => {
      const response = await request(app)
        .post('/twitter')
        .send();
      expect(response.status).toBe(401);
    });

    it('should valid credentials', async () => {
      const user = await factory.create('User');
      const twitter = await factory.build('Twitter');
      const response = await request(app)
        .post('/twitter')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          content: twitter.content,
        });
      expect(response.status).toBe(200);
    });
  });
});

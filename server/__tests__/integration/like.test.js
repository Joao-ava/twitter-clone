import request from 'supertest';
import { faker } from '@faker-js/faker';

import app from '#app/app.js';
import Twetter from '#app/tweets/entities/Twetter.js';
import truncate from '#tests/util/truncate.js';
import factory from '#tests/factories.js';

describe('Like', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('create', () => {
    it('should no have tweet', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .post(`/twetter/${faker.number.int()}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(404);
    });

    it('should alredy have like for tweet', async () => {
      const user = await factory.create('User');
      const twetter = await factory.create('Twetter', {
        user_id: user.id,
      });
      await factory.create('LikeUser', {
        user_id: user.id,
        twetter_id: twetter.id,
      });

      const response = await request(app)
        .post(`/twetter/${twetter.id}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(400);
    });

    it('should like user create', async () => {
      const user = await factory.create('User');
      const twetter = await factory.create('Twetter', {
        user_id: user.id,
        likes: 0,
      });

      const response = await request(app)
        .post(`/twetter/${twetter.id}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      const data = await Twetter.findByPk(twetter.id);
      expect(response.status).toBe(201);
      expect(data.likes).toBe(1);
    });
  });

  describe('delete', () => {
    it('should no have tweet', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .delete(`/twetter/${faker.number.int()}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(404);
    });

    it('should not have like for tweet', async () => {
      const user = await factory.create('User');
      const twetter = await factory.create('Twetter', {
        user_id: user.id,
      });

      const response = await request(app)
        .delete(`/twetter/${twetter.id}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(400);
    });

    it('should like user delete', async () => {
      const user = await factory.create('User');
      const twetter = await factory.create('Twetter', {
        user_id: user.id,
        likes: 1,
      });
      await factory.create('LikeUser', {
        user_id: user.id,
        twetter_id: twetter.id,
      });

      const response = await request(app)
        .delete(`/twetter/${twetter.id}/like`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(200);
      const data = await Twetter.findByPk(twetter.id);
      expect(data.likes).toBe(0);
    });
  });
});

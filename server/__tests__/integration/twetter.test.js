import request from 'supertest';

import app from '@/app';
import truncate from '@/tests/util/truncate';
import factory from '@/tests/factories';

describe('Twetter', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('index', () => {
    it('should return ,twetters from user', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/twetter`)
        .send();
      expect(response.status).toBe(200);
    });

    it('should have tree', async () => {
      const user = await factory.create('User');
      await factory.create('Twetter', {
        user_id: user.id,
      });
      await factory.create('Twetter', {
        user_id: user.id,
      });
      await factory.create('Twetter', {
        user_id: user.id,
      });
      const response = await request(app)
        .get(`/user/${user.id}/twetter`)
        .send();
      expect(response.body.length).toBe(3);
    });

    it('should return array', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .get(`/user/${user.id}/twetter`)
        .send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('store', () => {
    it('should not authenticated', async () => {
      const response = await request(app)
        .post('/twetter')
        .send();
      expect(response.status).toBe(401);
    });

    it('should valid credentials', async () => {
      const user = await factory.create('User');
      const twetter = await factory.build('Twetter');
      const response = await request(app)
        .post('/twetter')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          content: twetter.content,
        });
      expect(response.status).toBe(200);
    });
  });
});

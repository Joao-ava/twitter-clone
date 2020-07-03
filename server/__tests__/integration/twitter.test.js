import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('Twitter', () => {
  beforeEach(async () => {
    await truncate();
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

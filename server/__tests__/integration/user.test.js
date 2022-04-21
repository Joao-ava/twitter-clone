import request from 'supertest';
import faker from '@faker-js/faker';

import app from '@/app';
import truncate from '@/tests/util/truncate';
import factory from '@/tests/factories';

describe('User', () => {
  describe('Create', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('send black data', async () => {
      const response = await request(app)
        .post('/user')
        .send();
      expect(response.status).toBe(400);
    });

    it('send object empty', async () => {
      const response = await request(app)
        .post('/user')
        .send();
      expect(response.status).toBe(400);
    });

    it('send empty name', async () => {
      const user = await factory.build('User');

      const response = await request(app)
        .post('/user')
        .send({
          name: '',
          email: user.email,
          password: user.password,
        });
      expect(response.status).toBe(400);
    });

    it('send empty email', async () => {
      const user = await factory.build('User');

      const response = await request(app)
        .post('/user')
        .send({
          name: user.name,
          email: '',
          password: user.password,
        });
      expect(response.status).toBe(400);
    });

    it('send empty password', async () => {
      const user = await factory.build('User');

      const response = await request(app)
        .post('/user')
        .send({
          name: user.name,
          email: user.email,
          password: '',
        });
      expect(response.status).toBe(400);
    });

    it('should user already exist', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .post('/user')
        .send({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      expect(response.status).toBe(400);
    });

    it('should with valid credentials', async () => {
      const user = await factory.build('User');

      const response = await request(app)
        .post('/user')
        .send({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      expect(response.status).toBe(200);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('token not provided', async () => {
      const response = await request(app)
        .put('/user')
        .send();
      expect(response.status).toBe(401);
    });

    it('send empty data', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .put(`/user`)
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send();
      expect(response.status).toBe(400);
    });

    it('send empty object', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({});
      expect(response.status).toBe(400);
    });

    it('should valid data', async () => {
      const user = await factory.create('User');
      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          email: user.email,
        });
      expect(response.status).toBe(200);
    });

    it('should update email', async () => {
      const user = await factory.create('User');
      const newEmail = 'new@email.com';

      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          email: newEmail,
        });
      expect(response.body.email).toBe(newEmail);
    });

    it('should email already use', async () => {
      const user = await factory.create('User');
      const otherUser = await factory.create('User', {
        email: faker.internet.email(),
      });

      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          email: otherUser.email,
        });
      expect(response.status).toBe(400);
    });

    it('should invalid email', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          email: 'email.c@om',
        });
      expect(response.status).toBe(400);
    });

    it('old password is incorrect', async () => {
      const user = await factory.create('User');
      const wrongOldPassword = faker.internet.password();
      const newPassword = faker.internet.password();

      const response = await request(app)
        .put('/user')
        .send({
          email: user.email,
          oldPassword: wrongOldPassword,
          password: newPassword,
          confirmPassword: newPassword,
        });
      expect(response.status).toBe(401);
    });

    it('should new password low then 8', async () => {
      const user = await factory.create('User');
      const newPassword = '123456';

      const response = await request(app)
        .put('/user')
        .set('Authorization', `bearer ${user.generateToken()}`)
        .send({
          email: user.email,
          oldPassword: user.password,
          password: newPassword,
          confirmPassword: newPassword,
        });
      expect(response.status).toBe(400);
    });
  });
});

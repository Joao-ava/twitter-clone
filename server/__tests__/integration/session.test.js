import request from 'supertest';

import app from '@/app';
import truncate from '@/tests/util/truncate';
import factory from '@/tests/factories';

describe('authenticated', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('no send data', async () => {
    await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send();
    expect(response.status).toBe(400);
  });

  it('send black object', async () => {
    await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({});
    expect(response.status).toBe(400);
  });

  it('should not have email', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: '',
        password: user.password,
      });

    expect(response.status).toBe(400);
  });

  it('should not have password', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: '',
      });

    expect(response.status).toBe(400);
  });

  it('user not exists', async () => {
    const user = await factory.build('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(404);
  });

  it('password is incorrect', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: '45648795',
      });
    expect(response.status).toBe(401);
  });

  it('should with valid credentials', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.status).toBe(200);
  });

  it('have token in response', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.body).toHaveProperty('token');
  });

  it('return same email send', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(response.body.user.email).toBe(user.email);
  });
});

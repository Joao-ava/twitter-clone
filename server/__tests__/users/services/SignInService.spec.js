import faker from '@faker-js/faker';
import SignInService from '@/users/services/SignInService';
import UserNotFound from '@/users/errors/UserNotFound';
import PasswordIncorrect from '@/users/errors/PasswordIncorrect';
import makeUser from '../factories/makeUser';
import MemoryUsersRepository from '../mocks/repositories/MemoryUsersRepository';

describe('SignInService', () => {
  const makeSut = async () => {
    const user = makeUser();
    const params = { email: user.email, password: user.password };
    const usersRepository = new MemoryUsersRepository();
    await usersRepository.create(user);
    const sut = new SignInService(usersRepository);
    return { sut, usersRepository, params };
  };

  it('should be can sign exist user', async () => {
    const { sut, params } = await makeSut();
    const { user, token } = await sut.run(params);
    expect(!!token).toBe(true);
    expect(user).toMatchObject(user);
  });

  it('should be throw error if user email not exist', async () => {
    const { sut, params } = await makeSut();
    params.email = faker.internet.email();
    await expect(sut.run(params)).rejects.toThrowError(UserNotFound);
  });

  it('should be throw error if user password is incorrect', async () => {
    const { sut, params } = await makeSut();
    params.password = faker.internet.password();
    await expect(sut.run(params)).rejects.toThrowError(PasswordIncorrect);
  });
});

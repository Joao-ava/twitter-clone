import SignUpService from '#app/users/services/SignUpService.js';
import EmailAlreadyRegister from '#app/users/errors/EmailAlreadyRegister.js';

import makeSignUpParam from '../factories/makeSignUpParam.js';
import MemoryUsersRepository from '../mocks/repositories/MemoryUsersRepository.js';

describe('SignUpService', () => {
  const makeSut = () => {
    const usersRepository = new MemoryUsersRepository();
    const sut = new SignUpService(usersRepository);
    return { sut, usersRepository };
  };

  it('should be can create user', async () => {
    const { sut } = makeSut();
    const params = makeSignUpParam();
    const { user, token } = await sut.run(params);
    expect(!!token).toBe(true);
    expect(user).toMatchObject(user);
  });

  it('should be throw error if user email already used', async () => {
    const { sut, usersRepository } = makeSut();
    const params = makeSignUpParam();
    await usersRepository.create(params);
    await expect(sut.run(params)).rejects.toBeInstanceOf(EmailAlreadyRegister);
  });
});

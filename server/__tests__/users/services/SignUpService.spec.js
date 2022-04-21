import SignUpService from '@/users/services/SignUpService';
import EmailAlreadyRegister from '@/users/errors/EmailAlreadyRegister';
import makeSignUpParam from '../factories/makeSignUpParam';
import MemoryUsersRepository from '../mocks/repositories/MemoryUsersRepository';

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
    await expect(sut.run(params)).rejects.toThrowError(EmailAlreadyRegister);
  });
});

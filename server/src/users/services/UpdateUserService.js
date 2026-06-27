import EmailAlreadyRegister from '#app/users/errors/EmailAlreadyRegister.js';

class UpdateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, userData }) {
    const user = await this.userRepository.findById(userId);

    if (await this.emailAlreadyUse(user.email, userData.email))
      throw new EmailAlreadyRegister();

    await user.update(userData);
    const { id, name, email, avatar } = user;
    return {
      id,
      name,
      email,
      avatar,
    };
  }

  async emailAlreadyUse(oldEmail, newEmail) {
    if (oldEmail === newEmail) return false;

    const checkUser = await this.userRepository.findByEmail(newEmail);
    return checkUser;
  }
}

export default UpdateUserService;

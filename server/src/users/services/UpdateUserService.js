import BadRequest from '../../core/errors/BadRequest';

class UpdateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async emailAlreadyUse(oldEmail, newEmail) {
    if (oldEmail === newEmail) return false;
    const checkUser = await this.userRepository.findByEmail(newEmail);
    return checkUser;
  }

  async run({ userId, userData }) {
    const user = await this.userRepository.findById(userId);

    if (await this.emailAlreadyUse(user.email, userData.email))
      throw new BadRequest('Email já esta em uso');

    await user.update(userData);

    const { id, name, email, avatar } = user;
    return {
      id,
      name,
      email,
      avatar,
    };
  }
}

export default UpdateUserService;

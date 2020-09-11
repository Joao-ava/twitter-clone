import Unathorized from '../../core/errors/Unathorized';

class SignInService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run(userData) {
    const { email } = userData;
    const checkUser = await this.userRepository.findByEmail(email);

    if (checkUser) throw new Unathorized('Este email já existe');

    const user = await this.userRepository.create(userData);
    const { id, name } = user;

    return {
      user: {
        id,
        name,
        email,
      },
      token: user.generateToken(),
    };
  }
}

export default SignInService;

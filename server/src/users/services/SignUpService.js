import EmailAlreadyRegister from '@/users/errors/EmailAlreadyRegister';

class SignInService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run(userData) {
    const { email } = userData;
    const checkUser = await this.userRepository.findByEmail(email);

    if (checkUser) throw new EmailAlreadyRegister();

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

import EmailAlreadyRegister from '@/users/errors/EmailAlreadyRegister';

class SignUpService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run(data) {
    const { email } = data;
    const checkUser = await this.userRepository.findByEmail(email);
    if (checkUser) throw new EmailAlreadyRegister();

    const user = await this.userRepository.create(data);
    return {
      user,
      token: user.generateToken(),
    };
  }
}

export default SignUpService;

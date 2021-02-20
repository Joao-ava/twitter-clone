import UserNotFound from '@/users/errors/UserNotFound';
import PasswordIncorrect from '@/users/errors/PasswordIncorrect';

class SignInService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UserNotFound();
    if (!(await user.checkPassword(password))) throw new PasswordIncorrect();

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

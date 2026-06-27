import UserNotFound from '#app/users/errors/UserNotFound.js';
import PasswordIncorrect from '#app/users/errors/PasswordIncorrect.js';

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

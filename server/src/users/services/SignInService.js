import Unathorized from '../../core/errors/Unathorized';
import NotFound from '../../core/errors/NotFound';

class SignInService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFound('Usuario não encontrado');
    }

    if (!(await user.checkPassword(password))) {
      throw new Unathorized('Senha incorreta');
    }

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

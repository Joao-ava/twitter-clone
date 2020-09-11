import UserRepository from '../repositories/UserRepository';
import SignInService from '../services/SignInService';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const signIn = new SignInService(new UserRepository());
    const auth = await signIn.run({ email, password });

    return res.json(auth);
  }
}

export default new SessionController();

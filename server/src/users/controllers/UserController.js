import UserRepository from '@/users/repositories/UserRepository';
import SignUpService from '@/users/services/SignUpService';
import UpdateUserService from '@/users/services/UpdateUserService';

class UserController {
  async store(req, res) {
    const signUp = new SignUpService(new UserRepository());
    const user = await signUp.run(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const { userId } = req;
    const updateUser = new UpdateUserService(new UserRepository());
    const user = await updateUser.run({
      userId,
      userData: req.body,
    });
    return res.json(user);
  }
}

export default new UserController();

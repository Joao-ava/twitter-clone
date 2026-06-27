import UserRepository from '#app/users/repositories/UserRepository.js';
import SignUpService from '#app/users/services/SignUpService.js';
import UpdateUserService from '#app/users/services/UpdateUserService.js';

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

import UserRepository from '#app/users/repositories/UserRepository.js';
import ListFollowerService from '#app/users/services/ListFollowerService.js';

class FollowerController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const listFollowing = new ListFollowerService(new UserRepository());
    const followings = await listFollowing.run({ userId: id, page });
    return res.json(followings);
  }
}

export default new FollowerController();

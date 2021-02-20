import UserRepository from '@/users/repositories/UserRepository';
import ListFollowerService from '@/users/services/ListFollowerService';

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

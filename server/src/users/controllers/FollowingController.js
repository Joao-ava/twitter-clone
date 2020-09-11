import UserRepository from '../repositories/UserRepository';
import CreateFollowingService from '../services/CreateFollowingService';
import ListFollowingService from '../services/ListFollowingService';
import DeleteFollowingService from '../services/DeleteFollowingService';

class FollowingController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const listFollowing = new ListFollowingService(new UserRepository());
    const followings = await listFollowing.run({ userId: id, page });
    return res.json(followings);
  }

  async store(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const createFollowing = new CreateFollowingService(new UserRepository());
    await createFollowing.run({ userId, userFollowing: id });
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const deleteFollowing = new DeleteFollowingService(new UserRepository());
    await deleteFollowing.run({ userId, followingId: id });
    return res.json();
  }
}

export default new FollowingController();

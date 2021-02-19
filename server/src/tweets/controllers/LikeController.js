import TweetRepository from '../repositories/TweetRepository';
import CreateLikeService from '../services/CreateLikeService';
import DeleteLikeService from '../services/DeleteLikeService';

class LikeController {
  async store(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const createLike = new CreateLikeService(new TweetRepository());
    const like = await createLike.run({ userId, tweetId: id });
    return res.status(201).json(like);
  }

  async delete(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const deleteLike = new DeleteLikeService(new TweetRepository());
    await deleteLike.run({ userId, tweetId: id });
    return res.json();
  }
}

export default new LikeController();

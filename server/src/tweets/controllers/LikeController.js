import TweetRepository from '../repositories/TweetRepository';
import CreateLikeService from '../services/CreateLikeService';

class LikeController {
  async store(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const createLike = new CreateLikeService(new TweetRepository());
    const like = await createLike.run({ userId, tweetId: id });
    return res.status(201).json(like);
  }
}

export default new LikeController();

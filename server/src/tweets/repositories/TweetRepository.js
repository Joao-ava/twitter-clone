import Twetter from '../entities/Twetter';
import LikeUser from '../entities/LikeUser';

class TweetRepository {
  async findById(id) {
    const tweet = await Twetter.findByPk(id);
    return tweet;
  }

  async paginate({ userId, perPage = 20, page = 1 }) {
    const limit = perPage;
    const offset = (page - 1) * perPage;
    let where = {};
    if (userId) {
      where = { user_id: userId };
    }

    const twetters = await Twetter.findAll({
      order: ['id'],
      where,
      limit,
      offset,
    });
    return twetters;
  }

  async findLike({ userId, tweetId }) {
    const like = await LikeUser.findOne({
      where: {
        user_id: userId,
        twetter_id: tweetId,
      },
    });
    return like;
  }

  async likeTweet({ userId, tweetId }) {
    const like = await LikeUser.create({
      user_id: userId,
      twetter_id: tweetId,
    });
    return like;
  }

  async create({ data, userId }) {
    const twetter = await Twetter.create({
      ...data,
      user_id: userId,
    });
    return twetter;
  }
}

export default TweetRepository;

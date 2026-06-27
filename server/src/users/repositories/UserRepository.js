import File from '#app/core/entities/File.js';
import User from '#app/users/entities/User.js';
import UserFollower from '#app/users/entities/UserFollower.js';

class UserRepositories {
  async findById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return user;
  }

  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  async paginateFollowings({ userId, page = 1, perPage = 20 }) {
    const limit = perPage;
    const offset = (page - 1) * perPage;
    const followings = await UserFollower.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          as: 'following',
        },
      ],
      offset,
      limit,
    });
    return followings.map(user => user.following);
  }

  async paginateFollowers({ userId, page = 1, perPage = 20 }) {
    const limit = perPage;
    const offset = (page - 1) * perPage;
    const followers = await UserFollower.findAll({
      where: {
        follower_id: userId,
      },
      include: [
        {
          model: User,
          as: 'follower',
        },
      ],
      offset,
      limit,
    });
    return followers.map(user => user.follower);
  }
}

export default UserRepositories;

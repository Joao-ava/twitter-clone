import UserNotFound from '@/users/errors/UserNotFound';

class ListFollowerService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, page = 1 }) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFound();

    const followings = await this.userRepository.paginateFollowers({
      userId,
      page,
    });
    return followings;
  }
}

export default ListFollowerService;

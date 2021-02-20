import UserNotFound from '@/users/errors/UserNotFound';

class DeleteFollowingService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, followingId }) {
    const following = await this.userRepository.findById(followingId);
    if (!following) throw new UserNotFound();

    await following.removeFollowings(userId);
  }
}

export default DeleteFollowingService;

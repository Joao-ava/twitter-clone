import UserNotFound from '@/users/errors/UserNotFound';

class CreateFollowingService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, userFollowing }) {
    const user = await this.userRepository.findById(userFollowing);

    if (!user) throw new UserNotFound();

    await user.addFollowings(userId);
  }
}

export default CreateFollowingService;

import NotFound from '../../core/errors/NotFound';

class CreateFollowingService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, userFollowing }) {
    const user = await this.userRepository.findById(userFollowing);

    if (!user) throw new NotFound('Usuário não encontrado');

    await user.addFollowings(userId);
  }
}

export default CreateFollowingService;

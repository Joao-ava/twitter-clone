import NotFound from '../../core/errors/NotFound';

class DeleteFollowingService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, followingId }) {
    const following = await this.userRepository.findById(followingId);
    if (!following) throw new NotFound('Usuário não existe');
    await following.removeFollowings(userId);
  }
}

export default DeleteFollowingService;

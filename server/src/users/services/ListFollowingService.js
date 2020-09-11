import NotFound from '../../core/errors/NotFound';

class ListFollowingService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async run({ userId, page = 1 }) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFound('Usuário não encontrado');

    const followings = await this.userRepository.paginateFollowings({
      userId,
      page,
    });
    return followings;
  }
}

export default ListFollowingService;

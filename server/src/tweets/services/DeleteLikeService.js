import NotFound from '../../core/errors/NotFound';
import BadRequest from '../../core/errors/BadRequest';

class DeleteTweetService {
  constructor(tweetRepository) {
    this.tweetRepository = tweetRepository;
  }

  async run({ tweetId, userId }) {
    const tweet = await this.tweetRepository.findById(tweetId);
    if (!tweet) throw new NotFound('Tweet não existe');

    const checkLike = await this.tweetRepository.findLike({ tweetId, userId });
    if (!checkLike) throw new BadRequest('Você não deu like nesse tweet');

    await this.tweetRepository.deslikeTweet({ tweetId, userId });
    return tweet;
  }
}

export default DeleteTweetService;

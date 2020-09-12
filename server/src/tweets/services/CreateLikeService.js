import NotFound from '../../core/errors/NotFound';
import BadRequest from '../../core/errors/BadRequest';

class CreateTweetService {
  constructor(tweetRepository) {
    this.tweetRepository = tweetRepository;
  }

  async run({ tweetId, userId }) {
    const tweet = await this.tweetRepository.findById(tweetId);
    if (!tweet) throw new NotFound('Tweet não existe');

    const checkLike = await this.tweetRepository.findLike({ tweetId, userId });
    if (checkLike) throw new BadRequest('Você ja deu like nesse twitte');

    const like = await this.tweetRepository.likeTweet({ tweetId, userId });
    return like;
  }
}

export default CreateTweetService;

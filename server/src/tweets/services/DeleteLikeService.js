import NotFound from '#app/core/errors/NotFound.js';
import BadRequest from '#app/core/errors/BadRequest.js';

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

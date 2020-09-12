class CreateTweetService {
  constructor(tweetRepository) {
    this.tweetRepository = tweetRepository;
  }

  async run({ data, userId }) {
    const tweet = await this.tweetRepository.create({ data, userId });
    return tweet;
  }
}

export default CreateTweetService;

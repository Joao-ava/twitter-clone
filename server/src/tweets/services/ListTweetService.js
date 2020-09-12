class ListTweetService {
  constructor(tweetRepository) {
    this.tweetRepository = tweetRepository;
  }

  async run({ userId, perPage = 20, page = 1 }) {
    const tweets = await this.tweetRepository.paginate({
      userId,
      perPage,
      page,
    });
    return tweets;
  }
}

export default ListTweetService;

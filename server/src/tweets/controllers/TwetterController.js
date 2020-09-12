import TweetRepository from '../repositories/TweetRepository';
import ListTweetService from '../services/ListTweetService';
import CreateTweetService from '../services/CreateTweetService';

class TwetterController {
  async index(req, res) {
    const page = Number(req.query.page) || 1;
    const { id, perPage = 20 } = req.params;

    const listTweet = new ListTweetService(new TweetRepository());
    const twetters = await listTweet.run({ userId: id, page, perPage });
    return res.json(twetters);
  }

  async store(req, res) {
    const createTweet = new CreateTweetService(new TweetRepository());
    const twetter = await createTweet.run({
      data: req.body,
      userId: req.userId,
    });
    return res.json(twetter);
  }
}

export default new TwetterController();

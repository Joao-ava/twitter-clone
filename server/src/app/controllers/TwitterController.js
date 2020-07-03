import Twitter from '../models/Twitter';

class SessionController {
  async store(req, res) {
    const twitter = await Twitter.create({
      ...req.body,
      user_id: req.userId,
    });
    return res.json(twitter);
  }
}

export default new SessionController();

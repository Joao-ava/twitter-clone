import Twitter from '../models/Twitter';
import LikeUser from '../models/LikeUser';

class LikeController {
  async store(req, res) {
    const { id } = req.params;
    const checkTwitter = await Twitter.findByPk(id);

    if (!checkTwitter)
      return res.status(404).json({ error: 'Twitte não existe' });

    const checkLike = await LikeUser.findOne({
      where: {
        user_id: req.userId,
        twitter_id: id,
      },
    });

    if (checkLike) return res.json({ error: 'Você ja deu like nesse twitte' });

    const like = await LikeUser.create({
      user_id: req.userId,
      twitter_id: id,
    });
    return res.status(201).json(like);
  }
}

export default new LikeController();

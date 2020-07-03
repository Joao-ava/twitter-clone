import Twitter from '../models/Twitter';
import User from '../models/User';

class SessionController {
  async index(req, res) {
    const page = Number(req.query.page) || 1;
    const { id } = req.params;

    const checkUser = await User.findByPk(id, {
      attributes: ['id'],
    });

    if (!checkUser)
      return res.status(404).json({ error: 'Usuario não encontrado' });

    const twitters = await Twitter.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(twitters);
  }

  async store(req, res) {
    const twitter = await Twitter.create({
      ...req.body,
      user_id: req.userId,
    });
    return res.json(twitter);
  }
}

export default new SessionController();

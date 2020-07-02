import User from '../models/User';

class FollowerController {
  async index(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: User,
          as: 'followers',
        },
      ],
    });

    if (!user) return res.status(404).json({ error: 'Usuário não existe' });

    const { followers } = user;
    return res.json(followers);
  }
}

export default new FollowerController();

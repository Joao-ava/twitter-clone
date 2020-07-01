import User from '../models/User';

class FollowingController {
  async index(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: User,
          as: 'followings',
        },
      ],
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.json(user.followings);
  }

  async store(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.addFollowings(req.userId);
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.json();
  }
}

export default new FollowingController();

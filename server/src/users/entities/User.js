import Sequelize, { Model } from 'sequelize';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        bio: Sequelize.TEXT,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await argon2.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.User, {
      foreignKey: 'user_id',
      as: 'followers',
      through: 'user_followers',
    });
    this.belongsToMany(models.User, {
      foreignKey: 'follower_id',
      as: 'followings',
      through: 'user_followers',
    });
  }

  generateToken() {
    const { id } = this;
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  checkPassword(password) {
    return argon2.verify(this.password_hash, password);
  }
}

export default User;

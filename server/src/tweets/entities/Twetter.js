import Sequelize, { Model } from 'sequelize';

class Twetter extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        likes: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.belongsTo(models.Twetter, {
      foreignKey: 'twetter_id',
      as: 'original',
    });
    this.hasMany(models.Twetter, {
      as: 'retwittes',
    });
    this.hasMany(models.LikeUser, {
      as: 'users_like',
    });
  }
}

export default Twetter;

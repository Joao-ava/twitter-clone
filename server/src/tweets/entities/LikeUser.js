import Sequelize, { Model } from 'sequelize';

class LikeUser extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        twetter_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
    });
    this.belongsTo(models.Twetter, {
      foreignKey: 'twetter_id',
      as: 'twetter',
    });
  }
}

export default LikeUser;

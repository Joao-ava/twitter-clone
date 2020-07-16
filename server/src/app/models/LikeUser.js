import Sequelize, { Model } from 'sequelize';

class LikeUser extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        twitter_id: Sequelize.INTEGER,
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
    this.belongsTo(models.Twitter, {
      foreignKey: 'twitter_id',
      as: 'twitter',
    });
  }
}

export default LikeUser;

import { Model } from 'sequelize';

class UserFollower extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'follower',
    });
    this.belongsTo(models.User, {
      foreignKey: 'follower_id',
      as: 'following',
    });
  }
}

export default UserFollower;

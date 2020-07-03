import Sequelize, { Model } from 'sequelize';

class Twitter extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.belongsTo(models.Twitter, {
      foreignKey: 'twitter_id',
      as: 'original',
    });
    this.hasMany(models.Twitter, {
      as: 'retwittes',
    });
  }
}

export default Twitter;

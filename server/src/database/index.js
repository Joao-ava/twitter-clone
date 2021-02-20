import Sequelize from 'sequelize';

import databaseConfig from '@/config/database';

import File from '@/core/entities/File';
import User from '@/users/entities/User';
import UserFollower from '@/users/entities/UserFollower';
import Twetter from '@/tweets/entities/Twetter';
import LikeUser from '@/tweets/entities/LikeUser';

const models = [LikeUser, Twetter, User, UserFollower, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

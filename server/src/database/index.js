import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import File from '../core/entities/File';
import User from '../users/entities/User';
import UserFollower from '../users/entities/UserFollower';
import Twitter from '../app/models/Twitter';
import LikeUser from '../app/models/LikeUser';

const models = [LikeUser, Twitter, User, UserFollower, File];

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

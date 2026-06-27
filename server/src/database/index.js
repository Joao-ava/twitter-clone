import Sequelize from 'sequelize';

import databaseConfig from '#app/config/database.js';

import File from '#app/core/entities/File.js';
import User from '#app/users/entities/User.js';
import UserFollower from '#app/users/entities/UserFollower.js';
import Twetter from '#app/tweets/entities/Twetter.js';
import LikeUser from '#app/tweets/entities/LikeUser.js';

const models = [LikeUser, Twetter, User, UserFollower, File];

class Database {
  constructor() {
    this.init();
    this.listenShutdown();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  listenShutdown() {
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        if (!this.connection) return;

        this.connection.close();
      });
    })
  }
}

export default new Database();

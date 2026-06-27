import cors from 'cors';
import helmet from 'helmet';
import { Youch } from 'youch';
import express from 'express';

import '#app/bootstrap.js';
import routes from '#app/routes.js';
import AppError from '#app/core/errors/AppError.js';

import '#app/database/index.js';

const { log } = console;

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof AppError) {
        return res.status(err.status).json({ message: err.message });
      }

      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      log(err);

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;

import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';


import { router } from './router/router'
import {sequelize } from './models/index';

dotenv.config({
  path: '.env'
});

const app: Express = express();
const PORT = process.env.PORT || 3030;

app.use(express.json())
app.use(router);

(async function bootstrap () {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  });
})();
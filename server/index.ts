import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'

import { router } from './router/router'
import { sequelize } from './models/index';

dotenv.config({
  path: '.env'
});

const app: Express = express();
const PORT = process.env.PORT || 3030;

const app_path = 'app/dist/build'

app.use(express.static(app_path));

app.get('/*', (req, res) => {
  res.sendFile(path.join('app_path', 'index.html'));
});

app.use(cors());
app.use(express.json())
app.use(router);

(async function bootstrap () {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  });
})();
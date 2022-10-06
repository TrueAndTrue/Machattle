import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'

import { router } from './router/router'
import { sequelize } from './models/index';

dotenv.config({ path: __dirname+'/.env' });

const app = express();
const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development'

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (NODE_ENV == 'development') app.use(cors());

app.use(express.json())
app.use(router);

(async function bootstrap () {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  });
})();
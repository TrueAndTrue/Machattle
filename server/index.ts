import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'

import { rootRouter } from './router/index'
import { sequelize } from './models/index';
import { ServerSocket } from './socket';

dotenv.config({ path: __dirname+'/.env' });

const app = express();
const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development'

const server = require('http').createServer(app)
new ServerSocket(server);

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());

app.use(express.json())
app.use('/api',rootRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

(async function bootstrap () {
  await sequelize.sync();
  server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  });
})();

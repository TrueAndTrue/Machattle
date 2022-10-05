import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';

import { router } from './router/router'

dotenv.config({
  path: '.env'
});

const app: Express = express();
const PORT = process.env.PORT || 3030;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Heroku');
});

app.listen(PORT, () => {
    return console.log(`[server]: Server is running on ${PORT}`);
});
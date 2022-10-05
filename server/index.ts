import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';

import { router } from './router/router'

dotenv.config({
  path: '.env'
});

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    return console.log(`[server]: Server is running on ${PORT}`);
});
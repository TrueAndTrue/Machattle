import express, { Express, Request, Response } from 'express'

const router = express.Router();

router.get('/', (res :Response , req :Request) => {
  res.send("Hello Heroku")}
);

export { router };
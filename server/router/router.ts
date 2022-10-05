import express, { Express, Request, Response } from 'express'

const router = express.Router();

router.get('/', (res :Response , req :Request) => "Hello Heroku")

export { router };
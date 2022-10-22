import { Request, Response } from "express";
import { Inqueue } from "../models/Inqueue";

export const addUser = async (req: Request, res: Response) => {
  try {
    const response = await Inqueue.create(req.body.uid);
    res.status(201).send({ uid: response });
  } catch (error) {
    res.status(500).send("ERROR");
  }
};

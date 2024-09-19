import { Request, Response } from "express";
import { createUser, getUsers } from "../models/user_model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

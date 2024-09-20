import { Request, Response } from "express";
import { createUser, getUsers } from "../models/user_model";
import { client } from "../db/connectToPostgres";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password, confirmPassword, gender, email } =
      req.body;
    const query = await createUser();

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords dont match" });
    }

    // console.log(query);

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let profilePic;

    if (gender === "male") {
      profilePic = boyProfilePic;
    } else {
      profilePic = girlProfilePic;
    }

    const values = [name, username, hashedpassword, gender, email, profilePic];

    const result = await client.query(query, values);
    const user = result.rows[0];

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

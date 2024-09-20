import express from "express";
import { registerUser, listUsers } from "../controller/auth_controller";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/", listUsers);

// module.exports = userRouter;

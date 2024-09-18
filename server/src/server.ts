import dotenv from "dotenv";
import express from "express";
import colors from "colors/safe";

import { app, server } from "../socket/socket";
import connectToMongoDB from "../db/connectToMongoDB";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(colors.bgBlue(`server running in port ${PORT}`));
});

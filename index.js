import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import playersRouter from "./routes/players.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Set a default port if PORT is not provided in the environment variables
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDb is connected..!");

    app.use(express.json());
    app.use(cors());

    app.use('/players', playersRouter);
    app.use('/users', userRouter);

    app.get("/", function (req, res) {
      res.send("Hello Universe");
    });

    app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();

export { client };

import cors from "cors";
import express, { Application } from "express";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import { userRouter } from "./routers/userRouter";
import { foodRouter } from "./routers/foodRouter";

configDotenv();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/foods", foodRouter);

connectToMongoDB();
app.listen(8000, async () => {
  console.log(`Server is running on port ${8000}`);
});

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

app.use("/user", userRouter);
app.use("/food", foodRouter);
const port = 10000;

app.listen(port, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});

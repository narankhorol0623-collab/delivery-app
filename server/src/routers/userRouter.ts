import { createNewUser } from "../controller";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/new-user-sign-in", createNewUser);

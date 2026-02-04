import { createNewUser } from "../controller";
import { Router } from "express";
import { loginUser } from "../controller/user/verify-user.controller";

export const userRouter = Router();
userRouter.post("/new-user-sign-up", createNewUser);
userRouter.get("/login-user", loginUser);
// userRouter.post("/user-login", loginUser);
// userRouter.get("/refresh", createNewUser);

import { createNewUser } from "../controller";
import { Router } from "express";
import { loginUser } from "../controller/user/signin-user.controller";
import { resetPassword } from "../controller/user/reset-password-request.controller";

export const userRouter = Router();
userRouter.post("/new-user-sign-up", createNewUser);
userRouter.post("/reset-pass-request", resetPassword);
userRouter.get("/login-user", loginUser);

// userRouter.post("/user-login", loginUser);
// userRouter.get("/refresh", createNewUser);

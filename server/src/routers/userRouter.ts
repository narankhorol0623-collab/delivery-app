import { createNewUser } from "../controller";
import { Router } from "express";
import { loginUser } from "../controller/user/signin-user.controller";
import { resetPassword } from "../controller/user/reset-password-request.controller";
import { authentication, authorization } from "../middlewares";
import { UserRole } from "../models";
import { deleteUser } from "../controller/user/delete-user.controller";

export const userRouter = Router();
userRouter.post(
  "/new-user-sign-up",
  authentication,
  authorization(UserRole.ADMIN),
  createNewUser,
);
userRouter.post("/reset-pass-request", resetPassword);
userRouter.get("/login-user", loginUser);
userRouter.post("/delete-user-by-id", deleteUser);

import { createNewUser } from "../controller";
import { Router } from "express";
import { loginUser } from "../controller/user/signin-user.controller";
import { resetPasswordRequest } from "../controller/user/reset-password-request.controller";
import { authentication, authorization } from "../middlewares";
import { UserRole } from "../models";
import { deleteUser } from "../controller/user/delete-user.controller";
import { verifyPassword } from "../controller/user/verify-reset-password.controller";
import {
  resetPasswordToNew,
  // resetOldPasswordSecond,
  // resetPasswordThird,
} from "../controller/user/reset-password.controller";

export const userRouter = Router();
userRouter.post(
  "/new-user-sign-up",
  // authentication,
  // authorization(UserRole.ADMIN),
  createNewUser,
);
userRouter.get("/login-user", loginUser);
userRouter.delete("/delete-user-by-id/:id", deleteUser);
userRouter.post("/reset-pass-request", resetPasswordRequest);
userRouter.get("/verify-user", verifyPassword);
userRouter.post("/reset-password", resetPasswordToNew);

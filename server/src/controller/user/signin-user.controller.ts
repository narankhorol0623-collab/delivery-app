import { UserModel } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Email or Password is not correct!" });
      return;
    }
    const oldPassword = existingUser?.password;
    const isValidPassword = await bcrypt.compare(password, oldPassword!);
    const token = jwt.sign({ _id: existingUser._id }, "hello", {
      expiresIn: "4h",
    });

    if (isValidPassword) {
      res.status(200).json({
        message: "Logged in perfectly!",
        userInformation: existingUser,
        token,
      });
    } else {
      res.status(400).json({ message: "Email or password is not correct!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error!",
      error,
    });
  }
};

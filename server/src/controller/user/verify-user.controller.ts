import { UserModel } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    const oldPassword = existingUser?.password;
    const isValidPassword = await bcrypt.compare(password, oldPassword!);

    if (isValidPassword) {
      res.status(200).json({
        message: "Logged in perfectly!",
        userInformation: existingUser,
      });
    } else {
      res.status(400).json({ message: "Email password not correct" });
    }
  } catch (error) {
    console.error("Login failure!", error);
    res.status(500).json({
      message: "Not found",
      error,
    });
  }
};

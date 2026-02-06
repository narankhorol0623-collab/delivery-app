import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils/mail-utils";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    const oldPassword = existingUser?.password;
    const isValidPassword = await bcrypt.compare(password, oldPassword!);

    if (!isValidPassword) {
      const token = jwt.sign({ email }, `Hello? ${userName}`, {
        expiresIn: "2h",
      });

      await verifyUserEmail(
        email,
        `${process.env.BACKEND_API}/reset-user-password?token=${token}`,
      );

      res.status(400).json({
        message: "We sent verification link to your email!",
        userInformation: existingUser,
      });
    } else {
      res.status(200).json({ message: "Welcome" });
    }
  } catch (error) {
    res.status(400).json({ message: "Email is not found!" });
  }
};

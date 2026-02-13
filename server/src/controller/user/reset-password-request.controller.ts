import { Request, Response } from "express";
import { UserModel } from "../../models";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils/mail-utils";

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { userName, email } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ email }, `hello`, {
        expiresIn: "2h",
      });

      await verifyUserEmail(
        email,
        `${process.env.BACKEND_API}/verify-user?token=${token}`,
      );

      res.status(200).json({
        message: "We sent verification link to your email!",
        userInformation: existingUser,
        token,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Email is not found!" });
  }
};

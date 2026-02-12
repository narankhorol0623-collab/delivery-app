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
      const token = jwt.sign({ email }, `hello`, {
        expiresIn: "2h",
      });

      await verifyUserEmail(
        email,
        `${process.env.BACKEND_API}/verify-user?token=${token}`,
      );

      res.status(400).json({
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

// if (oldPassword !== password) {
//   res.status(400).json({ message: "First try failed!" });
// } else {
//   res.status(200).json({ message: "Welcome" });
// }
// if (oldPassword !== password) {
//   res.status(400).json({ message: "Second try failed!" });
// } else {
//   res.status(200).json({ message: "Welcome" });
// }
// if (oldPassword !== password) {
//   res.status(400).json({ message: "Your account is deleted!" });
//   return;
// } else {
//   res.status(200).json({ message: "Welcome" });
// }

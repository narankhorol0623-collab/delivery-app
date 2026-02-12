import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resetPasswordToNew = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    const oldPassword = user?.password;

    if (oldPassword) {
      res.status(400).send({ message: "Try other way?" });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = UserModel.findByIdAndUpdate({
        password: hashedPassword,
      });

      const token = jwt.sign({ _id: newUser }, "hello", {
        expiresIn: "2h",
      });
      res.status(200).send({
        message: `Your account is restored at ${Date.now} ago`,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Movement!" });
  }
};

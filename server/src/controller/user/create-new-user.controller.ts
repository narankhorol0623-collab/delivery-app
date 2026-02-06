import { UserModel } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { verifyUserEmail } from "../../utils/mail-utils";
import jwt from "jsonwebtoken";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, phoneNumber, address } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.error("This user is already exists!");
      res.status(400).json({ message: "This user already exists!" });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    const token = jwt.sign({ _id: newUser._id }, "hello", { expiresIn: "2h" });

    await verifyUserEmail(
      email,
      `${process.env.BACKEND_API}/verify-user?token=${token}`,
    );
    res
      .status(200)
      .json({ message: "User signed up perfectly", user: newUser, token });
  } catch (error) {
    console.error("Sign up failure!", error);
    res.status(400).json({ message: "Sign up failure!", error });
  }
};

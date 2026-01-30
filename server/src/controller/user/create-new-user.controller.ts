import { UserModel } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { verifyUserEmail } from "../../utils/mail-utils";
import jwt from "jsonwebtoken";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.error("This user is already exists!");
      res.status(400).json({ message: "This user already exists!" });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    const token = jwt.sign({ _id: newUser.id }, "hello", { expiresIn: "2h" });
    const decoded = jwt.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTdjMzBmODY4MGY3YTU4ZjJjNDc5NzAiLCJpYXQiOjE3Njk3NDY2ODEsImV4cCI6MTc2OTc1Mzg4MX0.",
    );
    const verified = jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTdjMzBmODY4MGY3YTU4ZjJjNDc5NzAiLCJpYXQiOjE3Njk3NDY2ODEsImV4cCI6MTc2OTc1Mzg4MX0.",
      "hello",
    );
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

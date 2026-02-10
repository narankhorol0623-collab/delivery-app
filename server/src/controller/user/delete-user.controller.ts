import { Request, Response } from "express";
import { UserModel } from "../../models";
import jwt from "jsonwebtoken";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email, userName, password } = req.body;
    const newUser = await UserModel.create({
      userName,
      email,
      password,
    });

    const token = jwt.sign({ _id: newUser._id }, "hello", { expiresIn: "2h" });

    const deleteById = await UserModel.deleteOne({ newUser, token });

    res.status(200).json({ message: "This user is deleted!", deleteById });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete!" });
  }
};

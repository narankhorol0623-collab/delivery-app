import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";

export const resetOldPasswordFirst = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 8);

    
  } catch (error) {
    res.status(400).json({ message: "Invalid Movement!" });
  }
};

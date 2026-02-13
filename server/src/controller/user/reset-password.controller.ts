import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resetPasswordToNew = async (req: Request, res: Response) => {
  try {
    const { password, newToken } = req.body.query;

    // const { email } = UserModel.findOne({ email });

    const email = jwt.verify(String(newToken), `hello`) as {
      email: string;
    };

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = UserModel.findByIdAndUpdate({
      password: hashedPassword,
      email,
    });
    if (email) {
      // const token = jwt.sign({ _id: email._id }, "hello", {
      //   expiresIn: "2h",
      // });
      let counter = 0;

      function incrementCounter() {
        counter++;
      }

      const intervalId = setInterval(incrementCounter, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
      }, 5000);

      res.status(200).send({
        message: `Your account is restored at ${counter} seconds ago`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Movement!" });
  }
};

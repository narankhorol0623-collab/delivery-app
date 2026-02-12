import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils";
import { UserModel } from "../../models";

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const { email } = jwt.verify(String(token), `hello`) as {
      email: string;
    };

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "wrong user" });
      return;
    }

    const newToken = jwt.sign({ email }, `hello`, {
      expiresIn: "2h",
    });

    res.status(200).redirect(`http:3000/reset-password?token=${newToken}`);
  } catch (error) {
    res.status(400).json({ message: "Invalid movement!" });
  }
};

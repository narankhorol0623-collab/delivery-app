import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils";

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    

    const token = jwt.sign({ _id: _id }, "hello", { expiresIn: "2h" });

    await verifyUserEmail(
      email,
      `${process.env.BACKEND_API}/verify-user?token=${token}`,
    );
  } catch (error) {}
};

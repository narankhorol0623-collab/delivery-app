import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      res.status(400).send({ message: "Bolichihoo hu!" });
      return;
    }
    if (!authToken.startsWith("Bearer")) {
      res.status(400).send({ message: "Bolichihoo hu!!!" });
      return;
    }
    const token = authToken.split(" ")[1] ?? "";

    const verifiedToken = verify(token, "hello") as {
      _id: string;
    };
    if (!verifiedToken._id) {
      res.status(400).send({ message: "Boliochee malaa!t" });
      return;
    }

    const userId = verifiedToken._id;

    const existingUser = {
      _id: userId,
      role: "ADMIN",
    };

    if (!existingUser) {
      res.status(400).send({ message: "Odoo shantardaa!!!" });
      return;
    }

    req.body.user = existingUser;
    next();
    
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

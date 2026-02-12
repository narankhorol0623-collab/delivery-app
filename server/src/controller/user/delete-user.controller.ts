import { Request, Response } from "express";
import { UserModel } from "../../models";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `${result?.userName} is deleted by Admin!`,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete User!" });
  }
};

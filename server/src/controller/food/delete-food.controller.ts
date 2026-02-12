import { Request, Response } from "express";
import { FoodModel, UserModel } from "../../models";

export const deleteFoods = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // if (!Array.isArray(foodName)) {
    //   res.status(200).json({ message: "deleted" });
    //   return;
    // }

    const result = await FoodModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `${result?.foodName} foods deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "error" });
  }
};

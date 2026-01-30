import { FoodCategoryModel, FoodModel } from "../../models";
import { Request, Response } from "express";

export const createNewFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    const newFood = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    // const existingFood = await FoodModel.findOne({ foodName });

    // if (existingFood) {
    //   console.error("This food is already exists!");
    //   res.status(400).json({ message: "This food already exists!" });

    //   return;
    // }
    await newFood.save();
    res
      .status(200)
      .json({ message: "Food created succesfully!", food: newFood });
  } catch (error) {
    console.error("Food creation failed.", error);
    res.status(200).json({ message: "Food creation failed.", error });
  }
};
export const createNewFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await FoodCategoryModel.create({
      categoryName,
    });
    await res
      .status(200)
      .json({ message: "category created", food: newCategory });
  } catch (error) {
    console.error("failed", error);
    res.status(200).json({ message: "failed", error });
  }
};

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { user, totalPrice, foodOrderItems, status } = req.body;
    const newCategory = await FoodCategoryModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
    });
    await res
      .status(200)
      .json({ message: "category created", food: newCategory });
  } catch (error) {
    console.error("failed", error);
    res.status(200).json({ message: "failed", error });
  }
};

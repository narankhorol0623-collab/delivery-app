import { Router } from "express";
import {
  createNewFood,
  createNewFoodCategory,
  createNewOrder,
} from "../controller";
import { authentication, authorization } from "../middlewares";
import { UserRole } from "../models";
import { deleteFoods } from "../controller/food/delete-food.controller";

export const foodRouter = Router();
foodRouter.post(
  "/food-creation",
  authentication,
  authorization(UserRole.ADMIN),
  createNewFood,
);

foodRouter.post("/food-category-creation", createNewFoodCategory);
foodRouter.post("/order-list", createNewOrder);
foodRouter.delete("/delete-food-by-id/:id", deleteFoods);

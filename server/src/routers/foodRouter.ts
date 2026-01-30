import { Router } from "express";
import {
  createNewFood,
  createNewFoodCategory,
  createNewOrder,
} from "../controller";

export const foodRouter = Router();
foodRouter
  .post("/food-creation", createNewFood)
  .post("/food-category-creation", createNewFoodCategory)
  .post("/order-list", createNewOrder);

import { Router } from "express";
import {
  createNewFood,
  createNewFoodCategory,
  createNewOrder,
} from "../controller";
import { authentication, authorization } from "../middlewares";
import { UserRole } from "../models";

export const foodRouter = Router();
foodRouter
  .post(
    "/food-creation",
    authentication,
    authorization(UserRole.ADMIN),
    createNewFood,
  )
  .post("/food-category-creation", createNewFoodCategory)
  .post("/order-list", createNewOrder);

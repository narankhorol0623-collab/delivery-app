import { model, models, ObjectId, Schema } from "mongoose";

type FoodCategory = {
  _id: ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategorySchema = new Schema<FoodCategory>(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true },
);

export const FoodCategoryModel =
  models.FoodCategory ||
  model<FoodCategory>("FoodCategory", FoodCategorySchema);

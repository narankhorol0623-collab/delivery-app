import { Model, model, models, Schema } from "mongoose";

type Food = {
  _id: Schema.Types.ObjectId;
  foodName: string;
  price: string;
  image: string;
  ingredients: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodSchema = new Schema<Food>(
  {
    foodName: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const FoodModel: Model<Food> =
  models.Food || model<Food>("Food", FoodSchema);

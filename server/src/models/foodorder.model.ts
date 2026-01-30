import { model, models, ObjectId, Schema, Model } from "mongoose";

enum FoodOrderStatus {
  PENDING = "pending",
  PREPARING = "preparing",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

type FoodOrderItem = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type FoodOrder = {
  _id: ObjectId;
  user: ObjectId;
  totalPrice: Number;
  foodOrderItems: FoodOrderItem[];
  status: FoodOrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItemSchema = new Schema<FoodOrderItem>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  },
  { _id: false },
);

const FoodOrderSchema = new Schema<FoodOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    totalPrice: { type: Number, required: true },
    foodOrderItems: [FoodOrderItemSchema],
    status: {
      type: String,
      enum: Object.values(FoodOrderStatus),
      default: FoodOrderStatus.PENDING,
      required: true,
    },
  },
  { timestamps: true },
);
export const FoodOrderModel: Model<FoodOrder> =
  models.FoodOrder || model<FoodOrder>("FoodOrder", FoodOrderSchema);

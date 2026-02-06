import { model, models, ObjectId, Schema, Model } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRole;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVeryfied: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<User>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
    ttl: { type: Date, default: null },
    isVeryfied: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel: Model<User> =
  models.User || model<User>("User", UserSchema);

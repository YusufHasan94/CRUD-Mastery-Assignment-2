import { Schema, model } from "mongoose";
import { User, address, orders, userName } from "./user.interface";

const nameSchema = new Schema<userName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const addressSchema = new Schema<address>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const orderSchema = new Schema<orders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});
const userSchema = new Schema<User>({
  userId: { type: Number },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: nameSchema,
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [String],
  address: addressSchema,
  orders: {
    type: orderSchema,
  },
});

export const UserModel = model<User>("User", userSchema);

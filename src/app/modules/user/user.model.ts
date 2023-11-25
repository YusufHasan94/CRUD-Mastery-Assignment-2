import { Schema, model, connect } from "mongoose";
import { User } from "./user.interface";

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
});

const User = model<User>("User", userSchema);

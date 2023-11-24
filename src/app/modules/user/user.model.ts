import { Schema, model, connect } from "mongoose";
import { User } from "./user.interface";

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: {},
});

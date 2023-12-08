import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import {
  TUser,
  UserModel,
  TAddress,
  TOrders,
  TUserName,
} from "./user.interface";

const nameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, "firstName required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName required"],
    },
  },
  { _id: false }
);
const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: [true, "street required for address"],
    },
    city: {
      type: String,
      required: [true, "city required for address"],
    },
    country: {
      type: String,
      required: [true, "country required for address"],
    },
  },
  { _id: false }
);
const orderSchema = new Schema<TOrders>(
  {
    productName: {
      type: String,
      required: [true, "product name required for orders"],
    },
    price: {
      type: Number,
      required: [true, "price required for orders"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity required for orders"],
    },
  },
  { _id: false }
);
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, "userId required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
  },
  fullName: nameSchema,
  age: {
    type: Number,
    required: [true, "age required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
  },
  isActive: {
    type: Boolean,
    required: [true, "isActive required"],
  },
  hobbies: {
    type: [String],
    required: [true, "hobbies required"],
  },
  address: addressSchema,
  orders: [orderSchema],
});

//creating static methods for checking user available or not
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

//creating static methods for checking username available or not
userSchema.statics.isUserNameExists = async function (username: string) {
  const existingUserName = await User.findOne({ username });
  return existingUserName;
};

//creating middleware to encrypt password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser, UserModel>("User", userSchema);

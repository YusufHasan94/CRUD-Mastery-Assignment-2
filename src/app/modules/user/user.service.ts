import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUerIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.find({ userId: id });
  console.log(result);
  return result;
};

export const userService = {
  createUerIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};

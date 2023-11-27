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

const getAUserFromDB = async (id: string) => {
  const result = await UserModel.aggregate([{ $match: { id } }]);
  return result;
};

export const userService = {
  createUerIntoDB,
  getAllUsersFromDB,
  getAUserFromDB,
};

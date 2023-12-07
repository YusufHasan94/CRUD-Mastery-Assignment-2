import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUerIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exists!");
  }
  if (await User.isUserNameExists(userData.username)) {
    throw new Error("Username already exists!");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: Number) => {
  const result = await User.aggregate([{ $match: { userId: id } }]);
  return result;
};

const updateUserFromDB = async (id: Number, newData: TUser) => {
  try {
    const updateUserInfo = await User.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updateUserInfo) {
      throw new Error("user not found");
    }
    return updateUserInfo;
  } catch (error: any) {
    throw new Error(`Error updating user ${error.message}`);
  }
};

const deleteUserFromDB = async (id: Number) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUerIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};

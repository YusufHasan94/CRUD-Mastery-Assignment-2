import { TOrders, TUser } from "./user.interface";
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

const updateUserDataFromDB = async (id: Number, newData: TUser) => {
  try {
    const updateUserDataInfo = await User.findOneAndUpdate(
      { userId: id },
      newData,
      { new: true }
    );
    if (!updateUserDataInfo) {
      throw new Error("user not found");
    }
    return updateUserDataInfo;
  } catch (error: any) {
    throw new Error(`Error updating user ${error.message}`);
  }
};

const deleteUserFromDB = async (id: Number) => {
  try {
    const result = await User.aggregate([
      { $match: { userId: id } },
      { $project: { userId: 1 } },
    ]);
    if (result.length > 0) {
      const deleteUser = await User.deleteOne({ userId: id });
      return deleteUser;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const addNewProduct = async (userId: Number, order: TOrders) => {
  try {
    const user = await User.findOne({ userId });
    if (user) {
      const result = await User.updateOne(
        { userId },
        { $push: { orders: { $each: order } } }
      );
      return result;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
};

const showAllProduct = async (userId: Number) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const result = await User.find({ userId }, { orders: 1 });
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  createUerIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserDataFromDB,
  deleteUserFromDB,
  addNewProduct,
  showAllProduct,
};

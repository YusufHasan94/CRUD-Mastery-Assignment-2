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

const getSingleUserFromDB = async (userId: Number) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const result = await User.aggregate([{ $match: { userId } }]);
      return result;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateUserDataFromDB = async (userId: Number, newData: TUser) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const updateUserDataInfo = await User.findOneAndUpdate(
        { userId },
        newData,
        { new: true }
      );
      return updateUserDataInfo;
    } else {
      throw new Error("User Not found");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const deleteUserFromDB = async (userId: Number) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const result = await User.deleteOne({ userId });
      if (result) {
        return null;
      }
    } else {
      throw new Error("User not found!");
    }
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const addNewProduct = async (userId: Number, order: TOrders) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const user = await User.findOne({ userId });
      if (user) {
        const result = await User.updateOne(
          { userId },
          { $push: { orders: order } }
        );
        return null;
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

const showAllProduct = async (userId: Number) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const result = await User.find({ userId }, { _id: 0, orders: 1 });
      if (result) {
        return result;
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const totalPriceOfOrders = async (userId: Number) => {
  try {
    if (await User.isUserExists(Number(userId))) {
      const result = await User.aggregate([
        { $match: { userId } },
        {
          $project: {
            order: 1,
            totalPrice: {
              $sum: {
                $map: {
                  input: "$orders",
                  as: "order",
                  in: {
                    $multiply: ["$$order.price", "$$order.quantity"],
                  },
                },
              },
            },
            _id: 0,
          },
        },
      ]);
      const totalPrice = result[0].totalPrice;
      return { totalPrice };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Something went wrong");
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
  totalPriceOfOrders,
};

import { TUser } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // const zodValidationData = userValidationSchema.parse(user);

    const result = await userService.createUerIntoDB(user);

    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;
    res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    if (result.length > 0) {
      const userData = result.map((user: TUser) => {
        const { username, fullName, age, email, address } = user;
        return {
          username,
          fullName,
          age,
          email,
          address,
        };
      });

      res.status(200).json({
        success: true,
        message: "users fetched successfully!",
        data: userData,
      });
    } else {
      throw new Error("No user Found!");
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserFromDB(parseInt(userId));
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "user find successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: error.code || 404,
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    // const zodValidationUpdatedData = userValidationSchema.parse(newData);
    const result = await userService.updateUserDataFromDB(
      parseInt(userId),
      user
    );
    res.status(200).json({
      success: true,
      message: "update successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "user deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const result = await userService.addNewProduct(parseInt(userId), order);
    res.status(200).json({
      success: true,
      message: "order created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};

const showAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.showAllProduct(Number(userId));
    res.status(200).json({
      success: true,
      message: "orders fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

const showTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.totalPriceOfOrders(Number(userId));
    res.status(200).json({
      success: true,
      message: "successfully calculated total",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
  addNewOrder,
  showAllOrders,
  showTotalPriceOfOrders,
};

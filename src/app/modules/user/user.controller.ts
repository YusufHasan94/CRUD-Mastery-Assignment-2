import { TUser } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidationData = userValidationSchema.parse(user);

    const result = await userService.createUerIntoDB(zodValidationData);

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
      error: {
        description: "user already exists",
      },
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
    const result = await userService.getSingleUserFromDB(Number(userId));
    if (result && result.length > 0) {
      const {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      } = result[0];

      res.status(200).json({
        success: true,
        message: "user find successfully",
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
    } else {
      throw {
        code: 404,
        description: "User not found",
      };
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found",
      },
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    const zodValidationUpdatedData = userValidationSchema.parse(user);
    const result = await userService.updateUserDataFromDB(
      parseInt(userId),
      zodValidationUpdatedData
    );
    if (result) {
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
        message: "User update successfully!",
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
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found!",
      },
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
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found!",
      },
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found",
      },
    });
  }
};

const showAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.showAllProduct(Number(userId));
    if (result) {
      const { orders } = result[0];
      res.status(200).json({
        success: true,
        message: "orders fetched successfully",
        data: { orders },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found",
      },
    });
  }
};

const showTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.totalPriceOfOrders(Number(userId));
    res.status(200).json({
      success: true,
      message: "Total calculated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: error.code || 404,
        description: error.description || "User not found",
      },
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

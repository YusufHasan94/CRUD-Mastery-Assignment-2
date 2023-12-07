import { TUser } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodValidationData = userValidationSchema.parse(userData);

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
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();

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
    const { user: newData } = req.body;
    const zodValidationUpdatedData = userValidationSchema.parse(newData);
    const result = await userService.updateUserFromDB(
      parseInt(userId),
      zodValidationUpdatedData
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
    const result = await userService.deleteUserFromDB(parseInt(userId));
    console.log(result);
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
};

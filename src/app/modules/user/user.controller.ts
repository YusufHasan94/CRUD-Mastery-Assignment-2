import { User } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userService.createUerIntoDB(userData);
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
      message: "user created successfully",
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
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();

    const userData = result.map((user: User) => {
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
      message: "users find successfully",
      data: userData,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await userService.getAUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "user find successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getAUser,
};

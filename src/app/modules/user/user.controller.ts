import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userService.createUerIntoDB(user);
    result.status(200).json({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createUser,
};

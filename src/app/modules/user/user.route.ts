import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:userId", userController.getSingleUser);
router.put("/api/users/:userId", userController.updateUserInfo);
router.delete("/api/users/:userId", userController.deleteUser);
router.put("/api/users/:userId/orders", userController.addNewOrder);
router.get("/api/users/:userId/orders", userController.showAllOrders);
router.get("/api/users/:userId/orders/total-price");

export const userRoutes = router;

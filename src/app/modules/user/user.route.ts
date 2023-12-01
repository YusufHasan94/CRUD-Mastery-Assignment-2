import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:userId", userController.getSingleUser);
router.put("/api/users/:userId");
router.delete("/api/users/:userId");
router.put("/api/users/:userId/orders");
router.get("/api/users/:userId/orders");
router.get("/api/users/:userId/orders/total-price");

export const userRoutes = router;

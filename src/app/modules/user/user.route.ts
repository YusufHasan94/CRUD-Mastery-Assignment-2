import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:userId", userController.getAUser);
// router.put("/api/users/:userId", userController.getAUser);
// router.delete("/api/users/:userId", userController.getAUser);
// router.put("/api/users/:userId/orders", userController.getAUser);
// router.get("/api/users/:userId/orders", userController.getAUser);
// router.get("/api/users/:userId/orders/total-price", userController.getAUser);

export const userRoutes = router;

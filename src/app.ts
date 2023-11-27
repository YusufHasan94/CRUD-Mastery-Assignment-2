import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);
export default app;

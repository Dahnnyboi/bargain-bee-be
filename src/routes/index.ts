import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";

export default (): Router => {
  const app = Router();

  userRoutes(app);
  authRoutes(app);

  return app;
};

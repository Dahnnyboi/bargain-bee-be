import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import uploadRoutes from "./upload";

export default (): Router => {
  const app = Router();

  userRoutes(app);
  authRoutes(app);
  uploadRoutes(app);

  return app;
};

import { Router } from "express";
import userRoutes from "./user";

export default (): Router => {
  const app = Router();

  userRoutes(app);

  return app;
};

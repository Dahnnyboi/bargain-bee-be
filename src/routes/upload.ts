import { Router } from "express";
import { uploadSingleImage } from "middlewares/upload";
import { uploadImage } from "controllers/upload";

const route = Router();

const authRouter = (app: Router) => {
  app.use("/upload", route);

  route.post("/image", uploadSingleImage, uploadImage);
};

export default authRouter;

import { Router } from "express";
import { postUser, getUserProfile } from "controllers/user";
import { checkSchema } from "express-validator";
import { USER_VALIDATIONS } from "constants/validations";
import { validationErrorHandler } from "middlewares/errors";
import { jwtMiddleware } from "middlewares/jwt";

const route = Router();

const userRoutes = (app: Router) => {
  app.use("/user", route);

  route.post(
    "/",
    validationErrorHandler(checkSchema(USER_VALIDATIONS)),
    postUser
  );

  route.get("/profile", jwtMiddleware, getUserProfile);
};

export default userRoutes;

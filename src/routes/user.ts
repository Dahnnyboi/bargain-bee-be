import { Router } from "express";
import { postUser } from "controllers/user";
import { checkSchema } from "express-validator";
import { USER_VALIDATIONS } from "constants/validations";
import { validationErrorHandler } from "middlewares/errors";

const route = Router();

const userRoutes = (app: Router) => {
  app.use("/user", route);

  route.post(
    "/",
    validationErrorHandler(checkSchema(USER_VALIDATIONS)),
    postUser
  );
};

export default userRoutes;

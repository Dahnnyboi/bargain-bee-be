import { Router } from "express";
import { checkSchema } from "express-validator";
import { USER_VALIDATIONS } from "constants/validations";
import { login } from "controllers/auth";
import { pick } from "lodash";

const route = Router();

const authRouter = (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/login",
    checkSchema({
      email: USER_VALIDATIONS.email,
      password: pick(USER_VALIDATIONS, ["notEmpty", "isString"]),
    }),
    login
  );
};

export default authRouter;

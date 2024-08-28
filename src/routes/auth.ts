import { Router } from "express";
import { checkSchema } from "express-validator";
import { USER_VALIDATIONS } from "constants/validations";
import { login, logout } from "controllers/auth";
import { pick } from "lodash";
import { jwtMiddleware } from "middlewares/jwt";

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
  route.delete("/logout", jwtMiddleware, logout);
};

export default authRouter;

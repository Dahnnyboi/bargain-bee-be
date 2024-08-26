import { Router } from "express";
import { postUser, getUserProfile, putUserProfile } from "controllers/user";
import { checkSchema } from "express-validator";
import { USER_VALIDATIONS } from "constants/validations";
import { validationErrorHandler } from "middlewares/errors";
import { jwtMiddleware } from "middlewares/jwt";
import { pick } from "lodash";

const route = Router();

const userRoutes = (app: Router) => {
  app.use("/user", route);

  route.post(
    "/",
    validationErrorHandler(checkSchema(USER_VALIDATIONS)),
    postUser
  );

  route.get("/profile", jwtMiddleware, getUserProfile);
  route.put(
    "/profile",
    jwtMiddleware,
    validationErrorHandler(
      checkSchema(
        pick(USER_VALIDATIONS, [
          "first_name",
          "last_name",
          "email",
          "street",
          "city",
          "country",
        ])
      )
    ),
    putUserProfile
  );
};

export default userRoutes;

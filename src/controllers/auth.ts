import { Request, Response, NextFunction } from "express";
import User from "models/user";
import { checkUserPassword, generateUserSalt } from "services/user";
import {
  errorFormatterResponse,
  successActionFormatterResponse,
} from "utils/formatter";
import { sign } from "services/jwt";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as Pick<USER, "email" | "password">;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(400);
      res.json(errorFormatterResponse("User email cannot be found"));
      return;
    }

    const isValidPassword = await checkUserPassword(user, password);

    if (!isValidPassword) {
      res.status(400);
      res.json(errorFormatterResponse("User password is wrong"));
      return;
    }

    const {
      user_id,
      first_name,
      last_name,
      email: userEmail,
      street,
      city,
      country,
      image,
      salt,
    } = user;

    const token = sign({ user_id, email: userEmail }, salt);
    const response = {
      token,
      first_name,
      last_name,
      email: userEmail,
      street,
      city,
      country,
      image,
      salt,
    };

    res.status(200);
    res.json(
      successActionFormatterResponse("Successful login", { ...response })
    );
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const { user_id } = user;

    await generateUserSalt(user_id);

    res.status(200);
    res.json(successActionFormatterResponse("Successful logout"));
  } catch (err) {
    next(err);
  }
};

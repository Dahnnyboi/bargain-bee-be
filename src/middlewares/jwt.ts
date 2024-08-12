import { NextFunction, Request, Response } from "express";
import { errorFormatterResponse } from "utils/formatter";
import { verify } from "services/jwt";
import UserModel from "models/user";

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401);
    res.json(errorFormatterResponse("Unauthorized route"));
    return;
  }

  // Format "Bearer {token}"
  const token = authHeader.split(" ")[1];

  try {
    const payload = verify(token);

    if (!payload) {
      res.status(400);
      res.json(errorFormatterResponse("Invalid JWT Token"));
      return;
    }

    const { user_id } = payload;

    const user = await UserModel.findOne({ where: { user_id } });

    if (!user) {
      res.status(400);
      res.json(errorFormatterResponse("Cannot find user"));
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

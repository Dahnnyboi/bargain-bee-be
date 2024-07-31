import { NextFunction, Request, Response } from "express";
import { createUser } from "services/user";

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    first_name,
    last_name,
    email,
    street,
    city,
    country,
    password,
    image,
  } = req.body as Pick<
    USER,
    | "first_name"
    | "last_name"
    | "email"
    | "street"
    | "city"
    | "country"
    | "password"
    | "image"
  >;

  try {
    await createUser(
      first_name,
      last_name,
      email,
      street,
      city,
      country,
      password,
      image
    );

    res.status(200).json({ message: "Successfully created user" });
  } catch (err) {
    next(err);
  }
};

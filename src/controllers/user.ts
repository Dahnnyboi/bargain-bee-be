import { NextFunction, Request, Response } from "express";
import { createUser } from "services/user";
import { successActionFormatterResponse } from "utils/formatter";

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

    res
      .status(200)
      .json(successActionFormatterResponse("Successfully created a user"));
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  const { first_name, last_name, email, street, city, country, image } = user;

  const data = {
    first_name,
    last_name,
    email,
    street,
    city,
    country,
    image,
  };

  try {
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

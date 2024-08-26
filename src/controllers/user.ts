import { NextFunction, Request, Response } from "express";
import { createUser } from "services/user";
import { successActionFormatterResponse } from "utils/formatter";
import cleanDeep from "clean-deep";
import UserModel from "models/user";

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

export const putUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  const { user_id } = user;
  const { first_name, last_name, email, street, city, country } =
    req.body as Pick<
      USER,
      | "first_name"
      | "last_name"
      | "email"
      | "street"
      | "city"
      | "country"
      | "password"
    >;

  const query = cleanDeep({
    first_name,
    last_name,
    email,
    street,
    city,
    country,
  });

  try {
    await UserModel.update(query, { where: { user_id } });
    res
      .status(200)
      .json(
        successActionFormatterResponse("Successfully updated a user profile")
      );
  } catch (err) {
    next(err);
  }
};

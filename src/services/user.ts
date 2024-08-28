import UserModel from "models/user";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "constants/variables";
import { IUserModel } from "models/user";

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  street: string,
  city: string,
  country: string,
  password: string,
  image: string | undefined
) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  return await UserModel.create({
    first_name: firstName,
    last_name: lastName,
    street,
    city,
    country,
    image,
    email,
    password: hash,
  });
};

export const checkUserPassword = async (user: IUserModel, password: string) => {
  const { password: userPassword } = user;

  const match = await bcrypt.compare(password, userPassword);
  return match;
};

export const generateUserSalt = async (userId: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  await UserModel.update({ salt }, { where: { user_id: userId } });
};

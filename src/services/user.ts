import UserModel from "models/user";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "constants/variables";

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
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return await UserModel.create({
    first_name: firstName,
    last_name: lastName,
    street,
    city,
    country,
    image,
    email,
    salt,
    password: hash,
  });
};

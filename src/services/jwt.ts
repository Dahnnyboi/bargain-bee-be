import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES } from "constants/environments";

type SignPayload = {
  user_id: string;
  email: string;
};

const createSecretString = (personalKey: string) =>
  `${JWT_SECRET}_${personalKey}`;

export const sign = (payload: SignPayload, personalKey: string) => {
  return jwt.sign(payload, createSecretString(personalKey), {
    expiresIn: JWT_EXPIRES as string,
  });
};

export const verify = (token: string, personalKey: string) => {
  return jwt.verify(token, createSecretString(personalKey), (err, decoded) => {
    if (err) return null;

    return decoded;
  }) as unknown as SignPayload | false;
};

export const decodePayload = (token: string) => {
  return jwt.decode(token) as unknown as SignPayload | null;
};

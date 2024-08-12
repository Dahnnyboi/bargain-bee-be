import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES } from "constants/environments";

type SignPayload = {
  user_id: string;
  email: string;
};

export const sign = (payload: SignPayload) => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES as string,
  });
};

export const verify = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
    if (err) return null;

    return decoded;
  }) as unknown as SignPayload | false;
};

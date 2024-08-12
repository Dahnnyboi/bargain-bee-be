import * as express from "express";
import { IUserModel } from "models/user";

declare global {
  namespace Express {
    interface Request {
      user: IUserModel;
    }
  }
}

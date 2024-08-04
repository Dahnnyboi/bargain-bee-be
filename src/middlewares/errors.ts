import { Response, Request, NextFunction } from "express";
import { ContextRunner } from "express-validator";
import { ValidationError, ValidationErrorItem } from "sequelize";
import {
  SEQUELIZE_ERROR_MESSAGE,
  EXPRESS_VALIDATOR_ERROR_MESSAGE,
} from "constants/variables";
import { errorFormatterResponse } from "utils/formatter";

export const validationErrorHandler =
  (validations: ContextRunner[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const errorsArray: ERRORS_RESPONSE = [];

    if (validations && validations.length !== 0) {
      for (const validation of validations) {
        const result = await validation.run(req);

        if (!result.isEmpty()) {
          const object = result.array()[0];

          if (object.type === "field") {
            const path = object.path;
            const message = object.msg;

            errorsArray.push({ [path]: message });
          }
        }
      }

      if (errorsArray && errorsArray.length !== 0) {
        res.status(400);
        res.json(
          errorFormatterResponse(EXPRESS_VALIDATOR_ERROR_MESSAGE, errorsArray)
        );
      } else {
        next();
      }
    } else {
      next();
    }
  };

export const validationSequelizeError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    const errorsArray: ERRORS_RESPONSE = [];

    err.errors.forEach((err: ValidationErrorItem) => {
      const { message, path } = err;

      if (path) errorsArray.push({ [path]: message });
    });

    if (errorsArray.length !== 0) {
      res.status(400);
      res.json(errorFormatterResponse(SEQUELIZE_ERROR_MESSAGE, errorsArray));
    } else {
      next();
    }
  } else {
    next();
  }
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`${req.originalUrl} not found`);

  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

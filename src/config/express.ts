import express, { Application, Response, Request } from "express";
import { PORT } from "constants/environments";
import { API_PREFIX } from "constants/variables";
import {
  validationSequelizeError,
  notFoundHandler,
  errorHandler,
} from "middlewares/errors";
import routes from "routes";
import logger from "utils/logger";

const expressStart = (app: Application) => {
  app.use(express.json());

  app.get(API_PREFIX, (req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to bargain bee server",
    });
  });

  app.use(API_PREFIX, routes());

  app.use(validationSequelizeError);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`);
  });
};

export default expressStart;

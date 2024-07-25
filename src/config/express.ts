import express, { Application, Response, Request } from "express";
import { PORT } from "constants/environments";
import { API_PREFIX } from "constants/variables";
import { notFoundHandler, errorHandler } from "middlewares/errors";

const expressStart = (app: Application) => {
  app.use(express.json());

  app.get(API_PREFIX, (req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to bargain bee server",
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

export default expressStart;

import express from "express";

import sequelizeStart from "config/sequelize";
import expressStart from "config/express";

const app = express();

const startServer = async () => {
  await sequelizeStart();

  await expressStart(app);
};

startServer();

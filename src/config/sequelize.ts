import { Sequelize } from "sequelize";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from "constants/environments";
import { IS_DEVELOPMENT } from "constants/variables";

const SSLOptions: boolean | SSLOPTIONTYPE = IS_DEVELOPMENT
  ? false
  : {
      require: true,
      rejectUnauthorized: false,
    };

const sequelize = new Sequelize(
  DATABASE_NAME as string,
  DATABASE_USER as string,
  DATABASE_PASSWORD as string,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: SSLOptions,
    },
    host: DATABASE_HOST as string,
    query: { raw: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function sequelizeStart() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelizeStart;

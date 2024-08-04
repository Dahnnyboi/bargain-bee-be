import { ENVIRONMENT } from "./environments";

export const IS_DEVELOPMENT = ENVIRONMENT === "development";
export const IS_PRODUCTION = ENVIRONMENT === "production";

export const API_PREFIX = "/api/v1";

export const SALT_ROUNDS = 10;

export const SEQUELIZE_ERROR_MESSAGE = "Sequelize Validation Error";
export const EXPRESS_VALIDATOR_ERROR_MESSAGE = "Field Validation Error";

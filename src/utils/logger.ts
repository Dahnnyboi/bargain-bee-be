import winston, { format } from "winston";
import { IS_DEVELOPMENT } from "constants/variables";

const { combine, timestamp, printf, colorize } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  debug: "blue",
  warn: "yellow",
  info: "green",
};

winston.addColors(colors);

const Logger = winston.createLogger({
  level: IS_DEVELOPMENT ? "debug" : "warn",
  levels: levels,
  format: combine(
    colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    printf(
      ({ level, message, timestamp }) => `[${level}] ${timestamp} - ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default Logger;

import winston from "winston";
import chalk from "chalk";

const { combine, timestamp, printf, colorize } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  const levelColor = {
    error: chalk.red.bold,
    warn: chalk.yellow.bold,
    info: chalk.cyan,
    http: chalk.green,
    debug: chalk.magenta,
  }[level] || chalk.white;

  return `${chalk.gray(`[${timestamp}]`)} ${levelColor(level.toUpperCase())}:\n${stack || message}\n${chalk.gray('─'.repeat(60))}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), consoleFormat),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

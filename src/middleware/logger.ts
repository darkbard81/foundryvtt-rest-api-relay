import { createLogger, format, transports } from "winston";
import { Counter, collectDefaultMetrics, Registry } from "prom-client";
import { LogLevel } from "../types/types";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular Reference]";
      }
      seen.add(value);
    }
    return value;
  };
};
const logger = createLogger({
  level: process.env.LOG_LEVEL || LogLevel.INFO,
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, getCircularReplacer(), 2)
        : "";
      return `${timestamp} [${level}]: ${message} ${metaString}`;
    })
  ),
  transports: [new transports.Console()],
});

// Create Prometheus metrics with typed labels
const logCounter = new Counter({
  name: "winston_logs_total",
  help: "Total number of log messages",
  labelNames: ["level"] as const,
});

const register = new Registry();
register.setDefaultLabels({ app: "audio-service" });
register.registerMetric(logCounter);
collectDefaultMetrics({ register });

export const log = {
  [LogLevel.INFO]: (message: string, meta: object = {}) => {
    logCounter.inc({ level: LogLevel.INFO });
    logger.info(message, meta);
  },
  [LogLevel.WARN]: (message: string, meta: object = {}) => {
    logCounter.inc({ level: LogLevel.WARN });
    logger.warn(message, meta);
  },
  [LogLevel.ERROR]: (message: string, meta: object = {}) => {
    logCounter.inc({ level: LogLevel.ERROR });
    logger.error(message, meta);
  },
  [LogLevel.DEBUG]: (message: string, meta: object = {}) => {
    logCounter.inc({ level: LogLevel.DEBUG });
    logger.debug(message, meta);
  },
} as const;

export { register };

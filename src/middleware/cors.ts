import type { Request, Response } from "hyper-express";

interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
}

export const corsMiddleware = (options: CorsOptions = {}) => {
  const defaultOptions: CorsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: false,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
  };

  const corsOptions = { ...defaultOptions, ...options };

  return async (req: Request, res: Response, next: () => void) => {
    // Get the request origin
    const requestOrigin = req.header("origin") || "*";

    // Determine the allowed origin
    let allowedOrigin: string;
    if (typeof corsOptions.origin === "string") {
      allowedOrigin = corsOptions.origin;
    } else if (Array.isArray(corsOptions.origin)) {
      allowedOrigin = corsOptions.origin.includes(requestOrigin)
        ? requestOrigin
        : "";
    } else if (typeof corsOptions.origin === "function") {
      allowedOrigin = corsOptions.origin(requestOrigin) ? requestOrigin : "";
    } else {
      allowedOrigin = "*";
    }

    // Set CORS headers
    res.header("Access-Control-Allow-Origin", allowedOrigin);

    if (corsOptions.credentials) {
      res.header("Access-Control-Allow-Credentials", "true");
    }

    if (corsOptions.exposedHeaders && corsOptions.exposedHeaders.length) {
      res.header(
        "Access-Control-Expose-Headers",
        corsOptions.exposedHeaders.join(", ")
      );
    }

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        corsOptions.methods!.join(", ")
      );

      if (corsOptions.allowedHeaders && corsOptions.allowedHeaders.length) {
        res.header(
          "Access-Control-Allow-Headers",
          corsOptions.allowedHeaders.join(", ")
        );
      } else {
        const requestHeaders = req.header("access-control-request-headers");
        if (requestHeaders) {
          res.header("Access-Control-Allow-Headers", requestHeaders);
        }
      }

      if (corsOptions.maxAge) {
        res.header("Access-Control-Max-Age", corsOptions.maxAge.toString());
      }

      if (!corsOptions.preflightContinue) {
        return res.status(204).send("");
      }
    }

    return next();
  };
};

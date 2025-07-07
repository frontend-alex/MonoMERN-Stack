import os from "os";
import fs from "fs";
import cluster from "cluster";

import { env } from "./config/env";
import { createServer } from "http";
import { logger } from "./utils/logger";
import express, { Application } from "express";
import { createServer as createHttpsServer } from "https";
import { configureSecurity } from "./middlewares/security";
import { connectDB, disconnectDB } from "./config/db";

class AppServer {
  private app: Application;
  private server: ReturnType<typeof createServer> | undefined;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));
    this.app.use(
      express.urlencoded({ extended: true, limit: env.REQUEST_BODY_LIMIT })
    );

    configureSecurity(this.app, env);

    this.app.set("trust proxy", env.TRUST_PROXY);
  }

  private configureRoutes() {
    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "ok" });
    });

    // Add your application routes here
    // this.app.use('/api', apiRouter);
  }

  private createServer() {
    if (env.HTTPS_ENABLED && env.SSL_CERT_PATH && env.SSL_KEY_PATH) {
      const options = {
        cert: fs.readFileSync(env.SSL_CERT_PATH),
        key: fs.readFileSync(env.SSL_KEY_PATH),
      };
      return createHttpsServer(options, this.app);
    }
    return createServer(this.app);
  }

  public async start() {
    try {
      await connectDB();

      this.server = this.createServer();

      this.server.listen(env.PORT, env.HOST, () => {
        logger.info(
          `Server running in ${env.NODE_ENV} mode on ${env.HOST}:${env.PORT}`
        );
        logger.info(`CORS allowed origins: ${env.CORS_ORIGINS.join(", ")}`);
      });

      this.setupErrorHandlers();
    } catch (error) {
      logger.error("Error starting server:", { error });
      await disconnectDB();
      process.exit(1);
    }
  }

  private setupErrorHandlers() {
    process.on("unhandledRejection", (err: Error) => {
      logger.error("Unhandled Rejection:", { err });
      this.gracefulShutdown();
    });

    process.on("uncaughtException", (err: Error) => {
      logger.error("Uncaught Exception:", { err });
      this.gracefulShutdown();
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down gracefully...");
      this.gracefulShutdown();
    });
  }

  private gracefulShutdown() {
    this.server?.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  }

  public static run() {
    if (env.CLUSTER_ENABLED && cluster.isPrimary) {
      const workers = env.CLUSTER_WORKERS || os.cpus().length;
      logger.info(`Master ${process.pid} is running with ${workers} workers`);

      for (let i = 0; i < workers; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        logger.warn(
          `Worker ${worker.process.pid} died (${signal || code}). Restarting...`
        );
        cluster.fork();
      });
    } else {
      new AppServer().start();
    }
  }
}

export default AppServer;

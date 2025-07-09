import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema, target: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const formattedErrors = result.error.format();

      res.status(400).json({
        message: "Validation error",
        errors: formattedErrors,
      });

      return;
    }

    req[target] = result.data;
    next();
  };

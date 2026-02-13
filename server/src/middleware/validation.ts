import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error;
      
      res.status(400).json({
        success: false,
        error: Error,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
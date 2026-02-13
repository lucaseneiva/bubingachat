import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ success: false, error: "Invalid JSON" });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ success: false, error: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ success: false, error: "Internal server error" });
}

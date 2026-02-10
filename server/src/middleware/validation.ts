import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validation = schema.validate(req.body);
    
    if (validation.error) {
      const errorMessage = validation.error.details[0]?.message || "Validation error";
      res.status(400).json({
        success: false,
        error: errorMessage,
      });
      return;
    }
    
    next();
  };
};

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
});
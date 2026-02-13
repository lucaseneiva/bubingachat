import jwt from "jsonwebtoken";
import type { UserModel } from "../../generated/prisma/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secret-key-in-production";

export const generateToken = (user: Omit<UserModel, "password_hash">): string => {
  return jwt.sign(
    { 
      userId: user.id.toString(), 
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

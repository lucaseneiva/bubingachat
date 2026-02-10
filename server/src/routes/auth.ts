import { Router, type Response } from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { validateRequest, registerSchema, loginSchema } from "../middleware/validation.js";
import { authenticate, type AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: "User with this email or username already exists",
      });
      return;
    }

    const password_hash = await hashPassword(password);

    const user = new User({
      username,
      email,
      password_hash,
    });

    await user.save();

    const userResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    const token = generateToken(userResponse);

    res.status(201).json({
      success: true,
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.post("/login", validateRequest(loginSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const userResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    const token = generateToken(userResponse);

    res.status(200).json({
      success: true,
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password_hash");
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
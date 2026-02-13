import { prisma } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { ConflictError, UnauthorizedError, NotFoundError } from "../utils/errors.js";

export class AuthService {
  async register(data: any) {
    const { username, email, password } = data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      throw new ConflictError("Email or username already in use");
    }

    const password_hash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { username, email, password_hash },
    });

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    return { user: userResponse, token: generateToken(userResponse) };
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    const isPasswordValid = user && await comparePassword(password, user.password_hash);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    return { user: userResponse, token: generateToken(userResponse) };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("User");
    }

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();
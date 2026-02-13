import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ error: "Username é obrigatório" })
    .min(3, "Username deve ter no mínimo 3 caracteres")
    .max(30, "Username deve ter no máximo 30 caracteres")
    .trim(),
  email: z
    .email("Formato de email inválido")
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z
    .email("Formato de email inválido")
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: "Senha é obrigatória" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
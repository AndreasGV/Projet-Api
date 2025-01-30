const { z } = require("zod");

exports.signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

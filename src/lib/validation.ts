import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  password: z.string().min(1).max(72),
});

export const invitationSchema = z.object({
  title: z.string().trim().min(1).max(120),
  occasion: z.string().trim().min(1).max(60).default("Other"),
  hostName: z.string().trim().min(1).max(120),
  eventDate: z.string().datetime().nullable().optional(),
  venue: z.string().trim().max(240).default(""),
  message: z.string().trim().max(5000).default(""),
  theme: z.string().trim().min(1).max(60).default("classic"),
  published: z.boolean().optional(),
});

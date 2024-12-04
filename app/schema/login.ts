import z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Email is required"),
	password: z.string().min(8, "Password is required"),
});

export type User = z.infer<typeof loginSchema>;

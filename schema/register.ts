import z from "zod";

export const registerSchema = z
	.object({
		email: z.string().email("Email: Must be a valid email address."),
		password: z
			.string()
			.min(8, "Password: Minimum 8 characters and should be strong.")
			.regex(
				/(?=.*[0-9])(?=.*[!@#$%^&*])/,
				"Password must contain at least one number and one special character.",
			),
		confirmPassword: z.string().min(8, "Confirm Password is required."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match.",
		path: ["confirmPassword"],
	});

export type User = z.infer<typeof registerSchema>;

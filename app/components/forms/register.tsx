"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Box, Typography, Button } from "@mui/material";
import { registerSchema } from "@/app/schema/register";
import AppInput from "@/app/components/common/appInput";
import ErrorSnackbar from "@/app/components/toast/snackbar";
import { useRegisterMutation } from "@/app/lib/api/user";
import { setToken } from "@/app/lib/reducers/authSlice";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<FormData>({
		resolver: zodResolver(registerSchema),
	});

	const [registerUser] = useRegisterMutation();

	const onSubmit = async (data: FormData) => {
		try {
			const response = await registerUser(data).unwrap();
			dispatch(setToken(response.token));
			router.push("/dashboard");
		} catch (error) {
			console.error("Registration error:", error);
			setSnackbar({
				open: true,
				message: "Registration failed. Please try again.",
			});
		}
	};

	return (
		<Container
			maxWidth='sm'
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				bgcolor: "background.default",
			}}
		>
			<ErrorSnackbar
				open={snackbar.open}
				message={snackbar.message}
				onClose={() => setSnackbar({ open: false, message: "" })}
			/>

			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					bgcolor: "white",
					padding: 4,
					borderRadius: 2,
					boxShadow: 2,
					width: "100%",
				}}
			>
				<Typography variant='h5' component='h1' gutterBottom>
					Create an Account
				</Typography>

				<AppInput
					id='email'
					label='Email Address'
					error={errors.email}
					register={register("email")}
				/>

				<AppInput
					id='password'
					label='Password'
					type='password'
					error={errors.password}
					register={register("password")}
				/>

				<AppInput
					id='confirmPassword'
					label='Confirm Password'
					type='password'
					error={errors.confirmPassword}
					register={register("confirmPassword")}
				/>

				<Button
					type='submit'
					disabled={!isDirty || isSubmitting}
					variant='contained'
					color='primary'
					fullWidth
					sx={{ mt: 3 }}
				>
					{isSubmitting ? "Registering..." : "Register"}
				</Button>

				<Typography variant='body2' align='center' sx={{ mt: 2 }}>
					Already have an account?{" "}
					<Link href='/login' style={{ color: "#1976d2" }}>
						Log In
					</Link>
				</Typography>
			</Box>
		</Container>
	);
}

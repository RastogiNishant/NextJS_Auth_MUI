"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Typography, Button } from "@mui/material";
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
		<Grid
			container
			direction='column'
			margin='auto'
			justifyContent='center'
			alignItems='center'
			sx={{
				bgcolor: "transparent",
				minHeight: "100vh",
				width: "100%",
				maxWidth: "400px",
			}}
		>
			<ErrorSnackbar
				open={snackbar.open}
				message={snackbar.message}
				onClose={() => setSnackbar({ open: false, message: "" })}
			/>

			<Grid
				item
				xs={12}
				sx={{
					bgcolor: "#ededed",
					borderRadius: "16px",
					padding: 4,
					color: "#000",
				}}
			>
				<Typography variant='h5' component='h1' gutterBottom>
					Create an Account
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
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
				</form>

				<Typography variant='body2' align='center' sx={{ mt: 2 }}>
					Already have an account?{" "}
					<Link href='/login' style={{ color: "#1976d2" }}>
						Log In
					</Link>
				</Typography>
			</Grid>
		</Grid>
	);
}

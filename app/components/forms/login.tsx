"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/schema/login";
import { Button, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ErrorSnackbar from "@/app/components/toast/snackbar";
import { useLoginMutation } from "@/app/lib/api/user";
import { useEffect, useState } from "react";
import {
	clearIsLoggedOutSuccess,
	setToken,
} from "@/app/lib/reducers/authSlice";
import { handleApiError } from "@/app/lib/utils/errorHandler";
import { ApiError } from "@/types";
import AppInput from "@/app/components/common/appInput";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginUser] = useLoginMutation();
	const { isLoggedOutSuccess, isLoggedInSuccess } = useSelector(
		(state: {
			auth: { isLoggedOutSuccess: boolean; isLoggedInSuccess: boolean };
		}) => state.auth,
	);
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<FormData>({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(data: FormData) {
		try {
			const responseData = await loginUser(data).unwrap();
			dispatch(setToken(responseData.token));
			router.push("/dashboard");
		} catch (error: unknown) {
			setSnackbarOpen(true);
			setErrorMessage(handleApiError(error as ApiError));
		}
	}

	useEffect(() => {
		if (isLoggedOutSuccess && !isLoggedInSuccess) {
			setSuccessSnackbarOpen(true);
			dispatch(clearIsLoggedOutSuccess());
		}
	}, [isLoggedOutSuccess, isLoggedInSuccess, dispatch]);

	return (
		<Grid
			container
			direction='column'
			margin='auto'
			justifyContent='center'
			alignItems='center'
			sx={{
				bgcolor: "transparent",
				color: "white",
				minHeight: "100vh",
				width: "100%",
				maxWidth: "400px",
			}}
		>
			<ErrorSnackbar
				open={snackbarOpen}
				message={errorMessage}
				onClose={() => setSnackbarOpen(false)}
			/>
			<ErrorSnackbar
				open={successSnackbarOpen}
				message='Logged out successfully!'
				onClose={() => setSuccessSnackbarOpen(false)}
				severity='success'
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
					Please login to continue
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AppInput
						id='email'
						label='Email address'
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
					<Button
						type='submit'
						disabled={!isDirty || isSubmitting}
						variant='contained'
						color='primary'
						fullWidth
						sx={{ mt: 3 }}
					>
						{isSubmitting ? "Logging In..." : "Login"}
					</Button>
				</form>
				<Typography variant='body2' align='center' sx={{ mt: 2 }}>
					Don&apos;t have an account?{" "}
					<Link href='/register' style={{ color: "#1976d2" }}>
						Register
					</Link>
				</Typography>
			</Grid>
		</Grid>
	);
}

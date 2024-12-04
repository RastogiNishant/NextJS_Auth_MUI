"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/schema/login";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import ErrorSnackbar from "../../components/snackbar";
import { useLoginMutation } from "@/app/services/user";
import { useState } from "react";
import { setToken } from "@/reducers/authSlice";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginUser] = useLoginMutation();
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
		} catch (error) {
			console.error("Login error:", error);
			setSnackbarOpen(true);
			setErrorMessage("Login failed. Please try again.");
		}
	}

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
				maxHeight: "100vh",
				width: "100%",
				maxWidth: "400px",
			}}
		>
			<ErrorSnackbar
				open={snackbarOpen}
				message={errorMessage}
				onClose={() => setSnackbarOpen(false)}
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
					Welcome back!
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register("email", { required: true })}
						id='email'
						label='Email address'
						type='text'
						fullWidth
						margin='normal'
						error={!!errors?.email}
						helperText={errors?.email?.message}
						variant='outlined'
						InputLabelProps={{ shrink: true }}
					/>

					<TextField
						{...register("password", { required: true })}
						id='password'
						label='Password'
						type='password'
						fullWidth
						margin='normal'
						error={!!errors?.password}
						helperText={errors?.password?.message}
						variant='outlined'
						InputLabelProps={{ shrink: true }}
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

				<Link
					href='/register'
					style={{
						display: "block",
						textAlign: "center",
						marginTop: "16px",
						color: "#1976d2",
					}}
				>
					Don&apos;t have an account? Register
				</Link>
			</Grid>
		</Grid>
	);
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signupSchema } from "@/schema/signup";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import ErrorSnackbar from "@/components/snackbar";
import { useRegisterMutation } from "@/app/services/user"; // Import the mutation hook
import { setToken } from "@/reducers/authSlice";

type FormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<FormData>({
		resolver: zodResolver(signupSchema),
	});

	const [registerUser] = useRegisterMutation();

	const onSubmit = async (data: FormData) => {
		try {
			const response = await registerUser(data).unwrap();
			dispatch(setToken(response.token));
			router.push("/dashboard");
		} catch (error) {
			console.error("Registration error:", error);
			setSnackbarOpen(true);
			setErrorMessage("Registration failed. Please try again.");
		}
	};

	return (
		<Container
			maxWidth='sm'
			sx={{
				color: "white",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				bgcolor: "transparent",
				justifyContent: "center",
			}}
		>
			<ErrorSnackbar
				open={snackbarOpen}
				message={errorMessage}
				onClose={() => setSnackbarOpen(false)}
			/>
			<Box
				sx={{
					padding: 4,
					color: "#000",
					bgcolor: "#ededed",
					borderRadius: "16px",
				}}
			>
				<Typography variant='h5' component='h1' gutterBottom>
					Create an Account
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

					<TextField
						{...register("confirmPassword", { required: true })}
						id='confirmPassword'
						label='Confirm Password'
						type='password'
						fullWidth
						margin='normal'
						error={!!errors?.confirmPassword}
						helperText={errors?.confirmPassword?.message}
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
						{isSubmitting ? "Signing Up..." : "Sign Up"}
					</Button>
				</form>

				<Link
					href='/login'
					style={{
						display: "block",
						textAlign: "center",
						marginTop: "16px",
						color: "#1976d2",
					}}
				>
					Already have an account? Log In
				</Link>
			</Box>
		</Container>
	);
}

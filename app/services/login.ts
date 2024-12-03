import { setToken } from "@/reducers/authSlice";
import { AppDispatch } from "@/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleLogin = async (
	data: { email: string; password: string },
	dispatch: AppDispatch,
	router: AppRouterInstance,
	setSnackbarOpen: (open: boolean) => void,
	setErrorMessage: (message: string) => void,
) => {
	try {
		const response = await fetch("https://reqres.in/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		});

		if (response.status === 200) {
			const responseData = await response.json();
			dispatch(setToken(responseData.token));
			router.push("/dashboard");
		} else {
			throw new Error("Registration failed");
		}
	} catch (error) {
		console.error("Registration error:", error);
		setSnackbarOpen(true);
		setErrorMessage("Registration failed. Please try again.");
	}
};

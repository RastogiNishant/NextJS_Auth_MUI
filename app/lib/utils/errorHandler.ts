import { ApiError } from "@/types";

export const handleApiError = (error: ApiError): string => {
	console.log("handleApiError", error);
	if (error?.status === 401) return "Invalid credentials. Please try again.";
	return "User not found. Please try again.";
};

import { ApiError } from "@/types";

export const handleApiError = (error: ApiError): string => {
	if (error?.status === 401) return "Invalid credentials. Please try again.";
	return "User not found. Please try again.";
};

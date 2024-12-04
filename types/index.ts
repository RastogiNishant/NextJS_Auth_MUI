import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type ApiError = {
	status: number;
	data: {
		error: string;
	};
};

export type AppInputProps = {
	id: string;
	label: string;
	type?: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
};

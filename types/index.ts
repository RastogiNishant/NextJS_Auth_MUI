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

type User = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
};

export type UserCardProps = {
	user: User;
};

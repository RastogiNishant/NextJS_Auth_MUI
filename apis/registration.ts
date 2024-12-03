import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
	email: string;
	password: string;
}

interface RegisterResponse {
	token: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

interface LoginResponse {
	token: string;
}

export const registrationApi = createApi({
	reducerPath: "registrationApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api" }),
	endpoints: (builder) => ({
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (credentials) => ({
				url: "/register",
				method: "POST",
				body: credentials,
			}),
		}),
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = registrationApi;

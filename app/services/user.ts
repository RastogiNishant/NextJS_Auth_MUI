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

interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

interface UsersResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: User[];
}

export const userApi = createApi({
	reducerPath: "userApi",
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
		getUsers: builder.query<UsersResponse, number>({
			query: (page) => `/users?page=${page}`,
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useGetUsersQuery } =
	userApi;

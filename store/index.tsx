"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import { userApi } from "../apis/userApis";
import { Middleware } from "redux";
import logger from "redux-logger";

const isDev = process.env.NODE_ENV === "development";

const middleware: Middleware[] = isDev
	? [logger, userApi.middleware]
	: [userApi.middleware];

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleware),
	devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

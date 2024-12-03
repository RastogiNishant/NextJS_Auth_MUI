"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import logger from "redux-logger";
import authReducer from "@/reducers/authSlice";
import { registrationApi } from "@/apis/registration";

const isDev = process.env.NODE_ENV === "development";

const middleware: Middleware[] = [
	registrationApi.middleware,
	...(isDev ? [logger] : []),
];

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[registrationApi.reducerPath]: registrationApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleware),
	devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import logger from "redux-logger";
import authReducer from "@/app/lib/reducers/authSlice";
import { userApi } from "@/app/lib/api/user";

const isDev = process.env.NODE_ENV === "development";

const middleware: Middleware[] = [
	userApi.middleware,
	...(isDev ? [logger] : []),
];

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
	token: string | null;
	isLoggedInSuccess: boolean;
	isLoggedOutSuccess: boolean;
}

const initialState: AuthState = {
	token: Cookies.get("authToken") || null,
	isLoggedInSuccess: false,
	isLoggedOutSuccess: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			state.isLoggedInSuccess = true;
			Cookies.set("authToken", action.payload, { expires: 7 });
		},
		clearToken(state) {
			state.token = null;
			state.isLoggedInSuccess = false;
			state.isLoggedOutSuccess = true;
			Cookies.remove("authToken");
		},
		clearIsLoggedInSuccess(state) {
			state.isLoggedInSuccess = false;
		},
		clearIsLoggedOutSuccess(state) {
			state.isLoggedOutSuccess = false;
		},
	},
});

export const {
	setToken,
	clearToken,
	clearIsLoggedInSuccess,
	clearIsLoggedOutSuccess,
} = authSlice.actions;
export default authSlice.reducer;

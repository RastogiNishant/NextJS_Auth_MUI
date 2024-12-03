import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
	token: string | null;
}

const initialState: AuthState = {
	token: Cookies.get("authToken") || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
			Cookies.set("authToken", action.payload, { expires: 7 });
		},
		clearToken(state) {
			state.token = null;
			Cookies.remove("authToken");
		},
	},
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

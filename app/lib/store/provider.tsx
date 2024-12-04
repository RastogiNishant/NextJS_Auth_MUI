"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { store } from ".";

const theme = createTheme();

type ClientProvidersProps = {
	children: ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</Provider>
	);
}

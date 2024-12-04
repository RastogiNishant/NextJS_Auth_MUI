import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorSnackbarProps {
	open: boolean;
	message: string;
	severity?: "success" | "error";
	onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
	open,
	message,
	severity = "error",
	onClose,
}) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={onClose}
			anchorOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
		>
			<Alert severity={severity} onClose={onClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default ErrorSnackbar;

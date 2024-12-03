import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorSnackbarProps {
	open: boolean;
	message: string;
	onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
	open,
	message,
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
			<Alert severity='error' onClose={onClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default ErrorSnackbar;

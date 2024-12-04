import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function LoadingSpinner() {
	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Box>
	);
}

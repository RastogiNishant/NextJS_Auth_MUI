"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useAuth from "@/app/hooks/useAuth";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isAuthenticated === undefined) {
			setLoading(true);
			return;
		}

		// Redirect if not authenticated
		if (!isAuthenticated) {
			router.push("/login");
		} else {
			setLoading(false);
		}
	}, [isAuthenticated, router]);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					height: "100vh",
					alignItems: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;

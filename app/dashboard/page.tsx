"use client";
import ProtectedRoute from "@/components/protectedRoutes";

const DashboardPage = () => {
	return (
		<ProtectedRoute>
			<div>
				<h1>Welcome to your Dashboard</h1>
			</div>
		</ProtectedRoute>
	);
};

export default DashboardPage;

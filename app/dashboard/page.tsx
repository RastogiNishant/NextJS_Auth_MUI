"use client";

import { useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
	Box,
	Grid,
	Menu,
	MenuItem,
	Skeleton,
	Container,
	IconButton,
	Typography,
	Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProtectedRoute from "@/app/components/auth/protectedRoutes";
import ErrorSnackbar from "@/app/components/toast/snackbar";
import UserCard from "@/app/components/common/userCard";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { useGetUsersQuery } from "@/app/lib/api/user";
import { clearToken } from "@/app/lib/reducers/authSlice";

const Dashboard = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const router = useRouter();
	const { data, isLoading, error } = useGetUsersQuery(page);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => setPage(value);

	const handleMenuClick = (event: MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleMenuClose = () => setAnchorEl(null);

	const handleLogout = () => {
		handleMenuClose();
		dispatch(clearToken());
		router.push("/login");
	};

	if (isLoading) return <LoadingSpinner />;

	if (error) {
		return (
			<>
				<ErrorSnackbar
					open={true}
					message={"Error loading users. Please try again."}
					onClose={() => window.location.reload()}
				/>
				<Container maxWidth='xl' sx={{ mt: 4, width: "100%" }}>
					<Grid container spacing={4}>
						{[...Array(6)].map((_, index) => (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Skeleton
									variant='rectangular'
									width={350}
									height={200}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</>
		);
	}

	return (
		<ProtectedRoute>
			<Container maxWidth='xl' sx={{ mt: 4, width: "100%" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 4,
					}}
				>
					<Typography variant='h4'>Dashboard</Typography>
					<IconButton onClick={handleMenuClick} edge='end'>
						<MoreVertIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</Box>

				<Grid container spacing={4}>
					{data?.data.map((user) => (
						<Grid item xs={12} sm={6} md={4} key={user.id}>
							<UserCard user={user} />
						</Grid>
					))}
				</Grid>

				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Pagination
						page={page}
						shape='rounded'
						variant='outlined'
						count={data?.total_pages}
						onChange={handlePageChange}
					/>
				</Box>
			</Container>
		</ProtectedRoute>
	);
};

export default Dashboard;

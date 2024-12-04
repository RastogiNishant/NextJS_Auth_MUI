"use client";
import Image from "next/image";
import { useState, MouseEvent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetUsersQuery } from "@/app/services/user";
import ProtectedRoute from "@/components/auth/protectedRoutes";
import {
	Box,
	Menu,
	Grid,
	Card,
	Skeleton,
	MenuItem,
	Container,
	Typography,
	IconButton,
	Pagination,
	CardContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorSnackbar from "@/components/snackbar";
import { clearToken } from "@/reducers/authSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetUsersQuery(page);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMenuClose();
		dispatch(clearToken());
	};

	const renderLoading = () => (
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

	const renderError = () => (
		<ProtectedRoute>
			<ErrorSnackbar
				open={true}
				message='Error loading users'
				onClose={() => window.location.reload()}
			/>
			<Container maxWidth='xl' sx={{ mt: 4, width: "100%" }}>
				<Grid container spacing={4}>
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<Grid item xs={12} sm={6} md={4} key={item}>
							<Skeleton
								variant='rectangular'
								width={350}
								height={200}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</ProtectedRoute>
	);

	const renderUsers = () => (
		<Grid container spacing={4}>
			{data?.data.map((user) => (
				<Grid item xs={12} sm={6} md={4} key={user.id}>
					<Card
						component='div'
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: 2,
							maxWidth: 450,
							minHeight: 200,
							justifyContent: "space-between",
						}}
					>
						<Image
							src={user.avatar}
							alt={user.first_name}
							width={100}
							height={100}
							style={{
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
						<CardContent
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								width: "100%",
								flexGrow: 1,
								justifyContent: "center",
							}}
						>
							<Typography
								variant='h6'
								component='div'
								sx={{
									textAlign: "center",
									wordBreak: "break-word",
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "block",
								}}
							>
								{user.first_name} {user.last_name}
							</Typography>
							<Typography
								color='textSecondary'
								sx={{
									textAlign: "center",
									wordBreak: "break-word",
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "block",
								}}
							>
								{user.email}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);

	if (isLoading) return renderLoading();
	if (error) return renderError();

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
					<IconButton
						onClick={handleMenuClick}
						edge='end'
						sx={{ alignSelf: "center" }}
					>
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

				{renderUsers()}

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

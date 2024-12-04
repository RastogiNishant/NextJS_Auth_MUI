import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";
import { UserCardProps } from "@/types";

export default function UserCard({ user }: UserCardProps) {
	return (
		<Card
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
				style={{ borderRadius: "50%", objectFit: "cover" }}
			/>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					flexGrow: 1,
					justifyContent: "center",
				}}
			>
				<Typography
					variant='h6'
					component='div'
					sx={{ textAlign: "center" }}
				>
					{user.first_name} {user.last_name}
				</Typography>
				<Typography color='textSecondary' sx={{ textAlign: "center" }}>
					{user.email}
				</Typography>
			</CardContent>
		</Card>
	);
}

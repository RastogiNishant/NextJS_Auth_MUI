import type { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import ClientProviders from "@/app/lib/store/provider";
import { Container } from "@mui/material";
import "@/app/globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Test App",
	description: "Developed by @Nishant",
};

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en' data-theme='light'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ClientProviders>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							minHeight: "100vh",
						}}
					>
						<Container component='main' style={{ flex: 1 }}>
							<header
								style={{
									padding: "1rem",
									textAlign: "center",
									fontSize: "clamp(1rem, 2vw, 1.5rem)",
									color: "#666",
									borderBottom: "1px solid #eee",
									margin: "0 auto",
									width: "100%",
									maxWidth: "1200px",
								}}
							>
								Created by{" "}
								<a
									href='https://github.com/RastogiNishant'
									style={{
										color: "#0070f3",
										textDecoration: "none",
										fontWeight: 500,
										transition: "color 0.2s ease",
									}}
								>
									@Nishant
								</a>
							</header>
							{children}
						</Container>
					</div>
				</ClientProviders>
			</body>
		</html>
	);
}

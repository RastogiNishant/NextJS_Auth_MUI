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
							{children}
						</Container>
					</div>
				</ClientProviders>
			</body>
		</html>
	);
}

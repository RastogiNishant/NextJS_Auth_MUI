import { Container } from "@mui/material";
import Login from "./login/page";

export default function Home() {
	return (
		<Container component='main' maxWidth='xs'>
			<Login />
		</Container>
	);
}

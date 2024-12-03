import { Container } from "@mui/material";
import Login from "./components/login/page";

export default function Home() {
	return (
		<Container component='main' maxWidth='xs'>
			<Login />
		</Container>
	);
}

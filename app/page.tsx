import { Container } from "@mui/material";
import Register from "./register/page";

export default function Home() {
	return (
		<Container component='main' maxWidth='xs'>
			<Register />
		</Container>
	);
}

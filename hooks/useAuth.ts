import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Import your RootState from store

const useAuth = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => !!state.auth.token,
	);

	return { isAuthenticated };
};

export default useAuth;

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const useAuth = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => !!state.auth.token,
	);

	return { isAuthenticated };
};

export default useAuth;

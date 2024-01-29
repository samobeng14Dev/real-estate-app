import { Navigate } from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";
import Loading from "./Loading";
import Profile from "../pages/Profile";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();
	if (checkingStatus) {
		return <Loading />;
	}
	return loggedIn ? <Profile /> : <Navigate to='/signIn' />;
};
export default PrivateRoute;

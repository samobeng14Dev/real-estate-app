import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Profile, SignIn, SignUp, ForgotPassword, Offers } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />,
	},
	{ path: "/profile", element: <Profile /> },
	{ path: "/signIn", element: <SignIn /> },
	{ path: "/signUp", element: <SignUp /> },
	{ path: "/forgotPassword", element: <ForgotPassword /> },
	{ path: "offers", element: <Offers /> },
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

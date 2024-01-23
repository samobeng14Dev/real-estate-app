import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	Home,
	Profile,
	SignIn,
	SignUp,
	ForgotPassword,
	Offers,
	About,
	Contact,
	RequestProperty,
} from "./pages";
import Landing from "./pages/Landing";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{ path: "/about", element: <About /> },
			{ path: "offers", element: <Offers /> },
			{ path: "/forgotPassword", element: <ForgotPassword /> },
			{ path: "/profile", element: <Profile /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/requestProperty", element: <RequestProperty /> },
		],
	},

	{ path: "/signIn", element: <SignIn /> },
	{ path: "/signUp", element: <SignUp /> },
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

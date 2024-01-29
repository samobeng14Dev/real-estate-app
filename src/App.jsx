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
	Landing,
} from "./pages";

import { PrivateRoute } from "./components";

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

			{ path: "/contact", element: <Contact /> },
			{ path: "/requestProperty", element: <RequestProperty /> },
			{ path: "/profile", element: <PrivateRoute /> },
		],
	},

	{ path: "/forgotPassword", element: <ForgotPassword /> },
	{ path: "/signIn", element: <SignIn /> },
	{ path: "/signUp", element: <SignUp /> },
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

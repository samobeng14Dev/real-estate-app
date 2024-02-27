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
	Listing,
	CreateListing,
	EditListing,
	Category,
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
			{ path: "/offers", element: <Offers /> },
			{ path: "/category/:categoryName", element: <Category /> },
			{ path: "/category/:categoryName/:listingId", element: <Listing /> },

			{ path: "/contact", element: <Contact /> },
			{ path: "/requestProperty", element: <RequestProperty /> },
			{ path: "/profile", element: <PrivateRoute /> },
			{ path: "/createListing", element: <CreateListing /> },
			{ path: "/editListing/:listingId", element: <EditListing /> },
			// {
			// 	path: "/createListing",
			// 	element: <PrivateRoute element={<CreateListing />} />,
			// },
			// {
			// 	path: "/editListing/:listingId",
			// 	element: <PrivateRoute element={<EditListing />} />,
			// },
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

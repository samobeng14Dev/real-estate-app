import { NavLink } from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";
import Loading from "./Loading";

const NavLinks = () => {
	const { loggedIn } = useAuthStatus();

	const links = [
		{ id: 1, url: "/", text: "home" },
		{ id: 2, url: "about", text: "about" },
		{ id: 3, url: "offers", text: "offers" },
		{ id: 4, url: "requestProperty", text: "request property" },
		{ id: 5, url: "contact", text: "contact" },
		{ id: 6, url: "profile", text: "profile" },
	];

	return (
		<>
			{links.map((link) => {
				const { id, url, text } = link;
				if (url === "profile" && !loggedIn) return null;
				return (
					<li key={id}>
						<NavLink
							className='capitalize'
							to={url}>
							{text}
						</NavLink>
					</li>
				);
			})}
		</>
	);
};

export default NavLinks;

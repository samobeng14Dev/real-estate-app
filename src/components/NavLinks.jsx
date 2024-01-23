import { NavLink } from "react-router-dom";
const NavLinks = () => {
	const links = [
		{ id: 1, url: "/", text: "home" },
		{ id: 2, url: "about", text: "about" },
		{ id: 3, url: "offers", text: "offers" },
		{ id: 4, url: "requestProperty", text: "request property" },
		{ id: 5, url: "contact", text: "contact" },
	];
	return (
		<>
			{links.map((link) => {
				const { id, url, text } = link;
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

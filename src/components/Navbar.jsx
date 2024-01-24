import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
const Navbar = () => {
	return (
		<nav className='bg-base-200 shadow-md sticky top-0 z-50'>
			<div className='navbar align-element'>
				<div className='navbar-start'>
					{/* TITLE */}
					<NavLink
						to='/'
						className='hidden lg:flex btn btn-primary text-3xl items-center'>
						S
					</NavLink>
					{/* DROPDOWN */}
					<div className='dropdown'>
						<label
							tabIndex={0}
							className='btn btn-ghost lg:hidden'>
							<FaBarsStaggered className='h6 w-6' />
						</label>
						<ul
							tabIndex={0}
							className='menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'>
							<NavLinks />
						</ul>
					</div>
				</div>
				{/* NAV CENTER */}
				<div className='navbar-center hidden lg:flex '>
					<ul className='menu menu-horizontal '>
						<NavLinks />
					</ul>
				</div>
				<div className='navbar-end'>
					{/* THEME SETUP */}
					<label className='swap swap-rotate cursor-pointer'>
						<input type='checkbox' />
						{/* sun icon */}
						<BsSunFill className='swap-on h-4 w-4' />
						{/* moon icon */}
						<BsMoonFill className='swap-off h-4 w-4' />
					</label>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

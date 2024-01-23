import { Link } from "react-router-dom";
import { useState } from "react";
const Header = () => {
	const [user, setUser] = useState(false);
	return (
		<header className='bg-neutral py-2 text-neutral-content'>
			<div className='align-element flex justify-center sm:justify-end'>
				{user ? (
					<div className='flex gap-x-2 sm:gap-x-8 items-center'>
						<p className='text-xs sm:text-sm'>Hello, User1</p>
						<button
							className='btn btn-xs btn-outline btn-primary'
							onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<div className='flex gap-x-6 justify-center items-center'>
						<Link
							to='/signIn'
							className='link link-hover text-xs sm:text-sm'>
							Sign in
						</Link>
						<Link
							to='/signUp'
							className='link link-hover text-xs sm:text-sm'>
							Create Account
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

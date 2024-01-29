import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState(""); // State for user's name
	const navigate = useNavigate();

	useEffect(() => {
		const auth = getAuth();
		const listener = onAuthStateChanged(auth, (user) => {
			setLoggedIn(!!user);
			if (user) {
				setUserName(user.displayName || user.email); // Set user name
			} else {
				setUserName(""); // Clear user name when logged out
			}
		});

		// Cleanup function to remove listener when component unmounts
		return () => {
			listener();
		};
	}, []);

	const onLogOut = async () => {
		try {
			await signOut(getAuth()); // Call signOut from Firebase
			navigate("/");
		} catch (error) {
			toast.error("Error signing out");
		}
	};

	return (
		<header className='bg-neutral py-2 text-neutral-content'>
			<div className='align-element flex justify-center sm:justify-end'>
				{loggedIn ? (
					<div className='flex gap-x-2 sm:gap-x-8 items-center'>
						<p className='text-xs sm:text-sm'>Hello, {userName}</p>
						<button
							className='btn btn-xs btn-outline btn-secondary'
							onClick={onLogOut}>
							Sign Out
						</button>
					</div>
				) : (
					<div className='flex gap-x-6 justify-center items-center'>
						<Link
							to='/profile'
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

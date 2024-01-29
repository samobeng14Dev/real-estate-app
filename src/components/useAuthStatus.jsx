import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		console.log(auth);
		const listener = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true);
			}
			setCheckingStatus(false);
		});

		// Cleanup function to remove listener when component unmounts
		return () => {
			listener();
		};
	}, []);
	return { loggedIn, checkingStatus };
};

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";

import { Loading } from "../components";

export default function Listing() {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchListing = async () => {
		const docRef = doc(db, "listings", params.listingId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setListing(docSnap.data());
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchListing();
	}, [params.listingId]);
	if (loading) {
		return <Loading />;
	}
	return <main>{listing.name}</main>;
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { Loading } from "../components";

const Listing = () => {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const params = useParams();
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
	return <div>{listing.name}</div>;
};

export default Listing;

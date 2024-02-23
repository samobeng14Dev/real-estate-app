import { useEffect, useState } from "react";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Loading } from "../components";
const Slider = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const fetchListing = async () => {
		const listingRef = collection(db, "listings");
		const q = query(listingRef, orderBy("timeStamp", "desc"), limit(5));
		const querySnap = await getDocs(q);
		let listings = [];
		querySnap.forEach((doc) => {
			return listings.push({
				id: doc.id,
				data: doc.data(),
			});
		});
		setListings(listings);
		console.log(listings);
		setLoading(false);
	};
	useEffect(() => {
		fetchListing();
	}, []);
	if (loading) {
		return <Loading />;
	}
	if (listings.length === 0) {
		return <></>;
	}
	return (
		listings && (
			<>
				{listings.map((listing) => (
					<h1 key={listing.id}>{listing.data.imgUrls[0]}</h1>
				))}
			</>
		)
	);
};

export default Slider;

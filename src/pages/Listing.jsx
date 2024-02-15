import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components";
import { db } from "../firebase";
import Slider from "react-slick";

const Listing = () => {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);

	var settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
	};

	useEffect(() => {
		async function fetchListing() {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		}
		fetchListing();
	}, [params.listingId]);

	if (loading || !listing || !listing.imgUrls) {
		return <Loading />;
	}

	return (
		<main>
			<div>Slider</div>
		</main>
	);
};

export default Listing;

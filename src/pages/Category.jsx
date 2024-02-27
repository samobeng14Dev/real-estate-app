import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	collection,
	getDocs,
	orderBy,
	query,
	where,
	startAfter,
	limit,
} from "firebase/firestore"; // Import startAfter and limit
import { db } from "../firebase";
import { Loading, ListingItem } from "../components"; // Assuming ListingItem is imported from another file
import { useParams } from "react-router";

const Category = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);
	const params = useParams();
	const fetchListings = async () => {
		try {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				limit(8)
			);
			const querySnapshot = await getDocs(q);
			const listingsData = [];
			querySnapshot.forEach((doc) => {
				listingsData.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listingsData);
			setLoading(false);
			if (querySnapshot.docs.length > 0) {
				setLastFetchedListing(
					querySnapshot.docs[querySnapshot.docs.length - 1]
				);
			} else {
				setLastFetchedListing(null);
			}
		} catch (error) {
			console.error("Error fetching listings:", error);
			toast.error("Could not fetch listings");
			setLoading(false);
		}
	};

	const fetchMoreListings = async () => {
		try {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("type", "==", params.categoryName),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchedListing),
				limit(4)
			);
			const querySnapshot = await getDocs(q);
			const newListingData = [];
			querySnapshot.forEach((doc) => {
				newListingData.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings((prevListings) => [...prevListings, ...newListingData]);
			if (querySnapshot.docs.length > 0) {
				setLastFetchedListing(
					querySnapshot.docs[querySnapshot.docs.length - 1]
				);
			} else {
				setLastFetchedListing(null);
			}
		} catch (error) {
			console.error("Error fetching more listings:", error);
			toast.error("Could not fetch more listings");
		}
	};

	useEffect(() => {
		fetchListings();
	}, [params.categoryName]);

	return (
		<div className='max-w-6xl mx-auto px-3'>
			<h1 className='text-3xl text-center mt-6 font-bold mb-6'>
				{params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
			</h1>
			{loading ? (
				<Loading />
			) : listings.length > 0 ? (
				<>
					<main>
						<ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
								/>
							))}
						</ul>
					</main>
					{lastFetchedListing && (
						<div className='flex justify-center items-center'>
							<button
								onClick={fetchMoreListings}
								className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>
								Load more
							</button>
						</div>
					)}
				</>
			) : (
				<p>
					There are no current{" "}
					{params.categoryName === "rent"
						? "places for rent"
						: "places for sale"}
				</p>
			)}
		</div>
	);
};

export default Category;

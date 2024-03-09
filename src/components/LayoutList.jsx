import { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	orderBy,
	query,
	where,
	limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";
const LayoutList = () => {
	const [offerListings, setOfferListings] = useState(null);

	const fetchOfferListings = async () => {
		try {
			//get reference
			const listingRef = collection(db, "listings");
			//create query
			const q = query(
				listingRef,
				where("offer", "==", true),
				orderBy("timestamp", "desc"),
				limit(4)
			);
			// execute query
			const querySnap = await getDocs(q);
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setOfferListings(listings);
			console.log(listings);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchOfferListings();
	}, []);
	//Places for rent
	const [rentListings, setRentListings] = useState(null);

	const fetchRentListings = async () => {
		try {
			//get reference
			const listingRef = collection(db, "listings");
			//create query
			const q = query(
				listingRef,
				where("type", "==", "rent"),
				orderBy("timestamp", "desc"),
				limit(4)
			);
			// execute query
			const querySnap = await getDocs(q);
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setRentListings(listings);
			console.log(listings);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchRentListings();
	}, []);
	// Places for rent
	const [saleListings, setSaleListings] = useState(null);
	useEffect(() => {
		async function fetchListings() {
			try {
				// get reference
				const listingsRef = collection(db, "listings");
				// create the query
				const q = query(
					listingsRef,
					where("type", "==", "sale"),
					orderBy("timestamp", "desc"),
					limit(4)
				);
				// execute the query
				const querySnap = await getDocs(q);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setSaleListings(listings);
			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, []);
	return (
		<div className='mt-12 grid gap-y-8 '>
			{offerListings && offerListings.length > 0 && (
				<div className='m-2 mb-6'>
					<h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
					<Link to='/offers'>
						<p className='px-3 text-sm  text-pink-300 hover:text-pink-500 transition duration-150 ease-in-out'>
							Show more offers
						</p>
					</Link>
					{/* loop through offers */}
					<ul className='p-8 rounded-lg flex flex-col sm:flex-row lg:flex-col gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'>
						{offerListings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
						))}
					</ul>
				</div>
			)}
			{rentListings && rentListings.length > 0 && (
				<div className='m-2 mb-6'>
					<h2 className='px-3 text-2xl mt-6 font-semibold'>Places for rent</h2>
					<Link to='/category/rent'>
						<p className='px-3 text-sm text-pink-300 hover:text-pink-500 transition duration-150 ease-in-out'>
							Show more places for rent
						</p>
					</Link>
					<ul className='p-8 rounded-lg flex flex-col sm:flex-row lg:flex-col gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group '>
						{rentListings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
						))}
					</ul>
				</div>
			)}
			{saleListings && saleListings.length > 0 && (
				<div className='m-2 mb-6'>
					<h2 className='px-3 text-2xl mt-6 font-semibold'>Places for sale</h2>
					<Link to='/category/sale'>
						<p className='px-3 text-sm text-pink-300 hover:text-pink-500 transition duration-150 ease-in-out'>
							Show more places for sale
						</p>
					</Link>
					<ul className='p-8 rounded-lg flex flex-col sm:flex-row lg:flex-col gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'>
						{saleListings.map((listing) => (
							<ListingItem
								key={listing.id}
								listing={listing.data}
								id={listing.id}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default LayoutList;

import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
export const fetchListingsHook = () => {
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
	return {
		offerListings,
		setOfferListings,
		saleListings,
		setSaleListings,
		rentListings,
		setRentListings,
	};
};

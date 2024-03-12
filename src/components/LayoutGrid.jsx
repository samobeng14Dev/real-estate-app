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
import { fetchListingsHook } from "./customHooks";

const LayoutGrid = () => {
	const {
		offerListings,
		setOfferListings,
		saleListings,
		setSaleListings,
		rentListings,
		setRentListings,
	} = fetchListingsHook();

	return (
		<div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{offerListings && offerListings.length > 0 && (
				<div className='m-2 mb-6'>
					<h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
					<Link to='/offers'>
						<p className='px-3 text-sm  text-pink-300 hover:text-pink-500 transition duration-150 ease-in-out'>
							Show more offers
						</p>
					</Link>
					{/* loop through offers */}
					<ul className='card w-full shadow-xl hover:shadow-2xl transition duration-300'>
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
					<ul className='card w-full shadow-xl hover:shadow-2xl transition duration-300 '>
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
					<ul className='card w-full shadow-xl hover:shadow-2xl transition duration-300 '>
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

export default LayoutGrid;

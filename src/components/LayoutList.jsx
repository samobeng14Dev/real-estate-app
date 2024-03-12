import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";
import { fetchListingsHook } from "./customHooks";
const LayoutList = () => {
	const {
		offerListings,
		setOfferListings,
		saleListings,
		setSaleListings,
		rentListings,
		setRentListings,
	} = fetchListingsHook();

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

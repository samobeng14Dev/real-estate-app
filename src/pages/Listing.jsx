import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, ContactLandLord } from "../components";

import { db } from "../firebase";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import {
	FaShare,
	FaMapMarkerAlt,
	FaBed,
	FaBath,
	FaParking,
	FaChair,
} from "react-icons/fa";

const Listing = () => {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [shareCopiedLink, setShareCopiedLink] = useState(false);
	const [contactLandlord, setContactLandlord] = useState(true);

	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		};
		fetchListing();
	}, [params.listingId]);

	if (loading || !listing || !listing.imgUrls) {
		return <Loading />;
	}

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide
			? listing.imgUrls.length - 1
			: currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === listing.imgUrls.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};
	return (
		<main>
			<div className='max-w-[1400px] h-[550px] w-full  relative group'>
				<div
					style={{ backgroundImage: `url(${listing.imgUrls[currentIndex]})` }}
					className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
				<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2  bg-white text-slate-500 cursor-pointer'>
					<BsChevronCompactLeft
						onClick={prevSlide}
						size={30}
					/>
				</div>
				<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white text-slate-500 cursor-pointer'>
					<BsChevronCompactRight
						onClick={nextSlide}
						size={30}
					/>
				</div>
				<div className='flex top-4 justify-center py-2'>
					{listing.imgUrls.map((imgUrl, index) => (
						<div
							key={index}
							onClick={() => goToSlide(index)}
							className={`text-2xl cursor-pointer ${
								index === currentIndex ? "text-blue-500" : ""
							}`}>
							<RxDotFilled />
						</div>
					))}
				</div>
			</div>
			{/* SHARE LINK */}
			<div
				className='absolute top-[50%] right-[15%] z-10 bg-white cursor-pointer border-2
			border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					setShareCopiedLink(true);
					setTimeout(() => {
						setShareCopiedLink(false);
					}, 2000);
				}}>
				<FaShare className='text-lg text-slate-500' />
			</div>
			{shareCopiedLink && (
				<p
					className='absolute top-[60%] left-[80%] font-semibold
				 border-2 border-gray-400 bg-whit p-2 bg-white rounded-md'>
					Link Copied
				</p>
			)}
			{/* LISTING INFO */}
			<div className='mt-8 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
				<div className=' w-full '>
					<p className='text-2xl font-bold mb-3 text-blue-900'>
						{listing.name} - ${" "}
						{listing.offer
							? listing.discountedPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{listing.type === "rent" ? " / month" : ""}
					</p>
					<p className='flex items-center mt-6 mb-3 font-semibold'>
						<FaMapMarkerAlt className='text-green-700 mr-1' />
						{listing.address}
					</p>
					<div className='flex justify-start items-center space-x-4 w-[75%]'>
						<p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
							{listing.type === "rent" ? "Rent" : "Sale"}
						</p>
						{listing.offer && (
							<p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md'>
								${+listing.regularPrice - +listing.discountedPrice} discount
							</p>
						)}
					</div>
					{/* LISTING DESCRIPTION */}
					<p className='mt-3 mb-3'>
						<span className='font-semibold'>Description - </span>
						{listing.description}
					</p>
					{/* LISTING AMENITIES */}
					<ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6'>
						<li className='flex items-center whitespace-nowrap'>
							<FaBed className='text-lg mr-1' />
							{+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
						</li>
						<li className='flex items-center whitespace-nowrap'>
							<FaBath className='text-lg mr-1' />
							{+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
						</li>
						<li className='flex items-center whitespace-nowrap'>
							<FaParking className='text-lg mr-1' />
							{listing.parking ? "Parking spot" : "No parking"}
						</li>
						<li className='flex items-center whitespace-nowrap'>
							<FaChair className='text-lg mr-1' />
							{listing.furnished ? "Furnished" : "Not furnished"}
						</li>
					</ul>
					{listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
						<div className='mt-6'>
							<button
								onClick={() => setContactLandlord(true)}
								className='px-7 py-3 btn btn-secondary text-white font-medium text-sm uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg w-full text-center transition duration-150 ease-in-out '>
								Contact Landlord
							</button>
						</div>
					)}
					{contactLandlord && (
						<ContactLandLord
							userRef={listing.userRef}
							listing={listing}
						/>
					)}
				</div>
				<div className='w-full bg-pink-300 h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2'>
					{/* <MapContainer
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
						style={{ height: "100%", width: "100%" }}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}>
							<Popup>{listing.address}</Popup>
						</Marker>
					</MapContainer> */}
				</div>
			</div>
		</main>
	);
};

export default Listing;

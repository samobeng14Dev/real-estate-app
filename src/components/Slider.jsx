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
import { useNavigate } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Loading from "./Loading";
export default function Slider() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	const navigate = useNavigate();
	useEffect(() => {
		async function fetchListings() {
			const listingsRef = collection(db, "listings");
			const q = query(
				listingsRef,
				where("offer", "==", true),
				orderBy("timestamp", "desc"),
				limit(4)
			);
			const querySnap = await getDocs(q);
			let listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
		}
		fetchListings();
	}, []);
	if (loading) {
		return <Loading />;
	}
	if (listings.length === 0) {
		return <></>;
	}
	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide
			? listings.imgUrls.length - 1
			: currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === listings.imgUrls.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};
	return (
		listings && (
			<>
				{listings.map(({ data, id }) => (
					<div
						className='max-w-[1400px] h-[550px] w-full  relative group'
						key={id}
						onClick={() => navigate(`/category/${data.type}/${id}`)}>
						<div
							style={{
								background: `url(${data.imgUrls[0]}) center, no-repeat`,
								backgroundSize: "cover",
							}}
							className='relative w-full h-[300px] overflow-hidden'></div>
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

						<p className='text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl'>
							{data.name}
						</p>
						<p className='text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
							${data.discountedPrice ?? data.regularPrice}
							{data.type === "rent" && " / month"}
						</p>
					</div>
				))}
			</>
		)
	);
}

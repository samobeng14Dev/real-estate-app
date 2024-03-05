import React, { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
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
				listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
		}
		fetchListings();
	}, []);

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? listings[0].data.imgUrls.length - 1 : prevIndex - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === listings[0].data.imgUrls.length - 1 ? 0 : prevIndex + 1
		);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};

	if (loading) {
		return <Loading />;
	}

	if (!Array.isArray(listings) || listings.length === 0) {
		return null; // or any fallback UI
	}

	return (
		<>
			{/* {listings.map(({ data, id }, index) => (
				<div
					className='max-w-[1400px] h-[550px] w-full relative group'
					key={id}
					onClick={() => navigate(`/category/${data.type}/${id}`)}
					style={{
						backgroundImage: `url(${data.imgUrls[currentIndex]})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}>
					<div
						className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-white text-slate-500 cursor-pointer'
						onClick={prevSlide}>
						<BsChevronCompactLeft size={30} />
					</div>
					<div
						className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white text-slate-500 cursor-pointer'
						onClick={nextSlide}>
						<BsChevronCompactRight size={30} />
					</div>

					<p className='text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl'>
						{data.name}
					</p>
					<p className='text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
						${data.discountedPrice ?? data.regularPrice}
						{data.type === "rent" && " / month"}
					</p>
				</div>
			))} */}

			<div className='carousel w-full '>
				<div
					id='slide1'
					className='carousel-item relative w-full'>
					<img
						src='https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg'
						className='w-full'
					/>

					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a
							href='#slide4'
							className='btn btn-circle'>
							❮
						</a>
						<a
							href='#slide2'
							className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
				<div
					id='slide2'
					className='carousel-item relative w-full '>
					<img
						src='https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg'
						className='w-full'
					/>
					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a
							href='#slide1'
							className='btn btn-circle'>
							❮
						</a>
						<a
							href='#slide3'
							className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
				<div
					id='slide3'
					className='carousel-item relative w-full'>
					<img
						src='https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg'
						className='w-full'
					/>
					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a
							href='#slide2'
							className='btn btn-circle'>
							❮
						</a>
						<a
							href='#slide4'
							className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
				<div
					id='slide4'
					className='carousel-item relative w-full'>
					<img
						src='https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg'
						className='w-full'
					/>
					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a
							href='#slide3'
							className='btn btn-circle'>
							❮
						</a>
						<a
							href='#slide1'
							className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

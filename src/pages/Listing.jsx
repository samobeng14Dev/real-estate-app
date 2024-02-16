import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components";
import { db } from "../firebase";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FaShare } from "react-icons/fa";

const Listing = () => {
	const auth = getAuth();
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [shareCopiedLink, setShareCopiedLink] = useState(false);

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
		</main>
	);
};

export default Listing;

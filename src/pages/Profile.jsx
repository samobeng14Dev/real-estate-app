import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
	doc,
	getDocs,
	orderBy,
	updateDoc,
	deleteDoc,
	collection,
	query,
	where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { db } from "../firebase";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ListingItem from "../components/ListingItem";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetail, setChangeDetail] = useState(false);
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;
	const onLogOut = () => {
		auth.signOut();
		navigate("/");
	};
	//update name
	const handleChange = (e) => {
		e.preventDefault();
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	//submit change
	const handleSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				//update display name in firebase auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				// update name in the fireStore
				const docRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(docRef, {
					name,
				});
			}
			toast.success("profile details updated");
		} catch (error) {
			toast.error("Could not update the profile details");
		}
	};
	// fetch listing from firebase
	useEffect(() => {
		const fetchUserListings = async () => {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc")
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
		};
		fetchUserListings();
	}, [auth.currentUser.uid]);

	// edit and delete functions
	const onEdit = (listingID) => {
		navigate(`/editListing/${listingID}`);
	};
	const onDelete = async (listingID) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", listingID));
			const updatedListings = listings.filter(
				(listing) => listing.id !== listingID
			);
			setListings(updatedListings);
			toast.success(" Listing successfully deleted");
		}
	};
	return (
		<>
			<section className='flex justify-center items-center flex-col'>
				<SectionTitle text='my profile' />
				<div className='w-full md:w-[50%] mt-6 px-3'>
					<form>
						{/* Name input */}
						<input
							className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border
							 border-gray-300 rounded transition ease-in-out ${
									changeDetail && "bg-red-200 focus:bg-red-200"
								}`}
							disabled={!changeDetail}
							onChange={handleChange}
							type='text'
							id='name'
							value={name}
						/>
						{/* Email Input */}
						<input
							className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border
							 border-gray-300 rounded transition ease-in-out duration-200'
							disabled
							type='email'
							id='email'
							value={email}
						/>
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							{/* EDIT */}
							<p className='flex items-center mb-6'>
								Do you want to edit your name?
								<span
									onClick={() => {
										changeDetail && handleSubmit();
										setChangeDetail((prevState) => !prevState);
									}}
									className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
									{changeDetail ? "Apply Change" : "Edit"}
								</span>
							</p>
							{/* LOGOUT */}
							<p
								onClick={onLogOut}
								className='text-blue-600 hover:to-blue-800 transition ease-in-out duration-200 cursor-pointer'>
								Sign out
							</p>
						</div>
					</form>
					<button
						type='submit'
						className='w-full btn btn-secondary uppercase hover:shadow-lg '>
						<Link
							to='/createListing'
							className='flex justify-center items-center'>
							<FcHome className='mr-2 text-3xl bg-red-300 rounded-full p-1 border-2' />
							Sell or rent your home
						</Link>
					</button>
				</div>
			</section>
			<div className='max-w-6xl px-3 mt-6 mx-auto'>
				{!loading && listings.length > 0 && (
					<>
						<h2 className='text-2xl text-center font-semibold mb-6'>
							My Listings
						</h2>
						<ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
									onEdit={() => onEdit(listing.id)}
									onDelete={() => onDelete(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</div>
		</>
	);
};

export default Profile;

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ContactLandLord = ({ userRef, listing }) => {
	const [landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState("");

	const getLandLord = async () => {
		const docRef = doc(db, "users", userRef);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setLandlord(docSnap.data());
		} else {
			toast.error("Could not get landlord data");
		}
	};
	useEffect(() => {
		getLandLord();
	}, [userRef]);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	return (
		<>
			{landlord !== null && (
				<div className='flex flex-col w-full'>
					<p>
						Contact{landlord.name} for the {listing.name.toLowerCase()}
					</p>
					<div className='mt-3 mb-6'>
						<textarea
							className='w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded 
                        transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
							name='message'
							id='message'
							rows='2'
							value={message}
							onChange={handleChange}></textarea>
					</div>
					<a
						href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
						<button
							className='w-full btn btn-secondary px-7 py-3 uppercase shadow-md hover:shadow-lg text-center mb-6'
							type='button'>
							Send Message
						</button>
					</a>
				</div>
			)}
		</>
	);
};

export default ContactLandLord;

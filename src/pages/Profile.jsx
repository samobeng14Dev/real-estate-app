import { getAuth } from "firebase/auth";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;
	const onLogOut = () => {
		auth.signOut();
		navigate("/");
	};
	return (
		<>
			<section className='flex justify-center items-center flex-col'>
				<SectionTitle text='my profile' />
				<div className='w-full md:w-[50%] mt-6 px-3'>
					<form>
						{/* Name input */}
						<input
							className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border
							 border-gray-300 rounded transition ease-in-out'
							disabled
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
							<p className='flex items-center mb-6'>
								Do you want to edit your name?
								<span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
									Edit
								</span>
							</p>
							<p
								onClick={onLogOut}
								className='text-blue-600 hover:to-blue-800 transition ease-in-out duration-200 cursor-pointer'>
								Sign out
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profile;

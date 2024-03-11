import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import lock from "../assets/lock.jpg";
import SectionTitle from "../components/SectionTitle";
import OAuth from "../components/OAuth";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success("Email was sent");
		} catch (error) {
			toast.error("Could not send reset password");
		}
	};

	return (
		<>
			<SectionTitle text='Forgot Password?' />
			<div className='flex justify-center flex-wrap items-center px-4 md:px-8 py-12 mt-10'>
				<div className='w-full md:w-1/2 lg:pr-12 mb-6 md:mb-0'>
					<img
						className='w-full rounded-2xl'
						src={lock}
						alt='key'
					/>
				</div>
				<div className='w-full md:w-1/2'>
					<form onSubmit={handleSubmit}>
						<input
							className='mb-4 md:mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
							type='email'
							id='email'
							value={email}
							onChange={handleChange}
							placeholder='Email address'
						/>

						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-4 md:mb-6'>
							<p>
								Don't have an account yet?{" "}
								<Link
									to='/signUp'
									className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out mr-1'>
									Register
								</Link>
							</p>
							<p>
								<Link
									to='/signIn'
									className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Sign In
								</Link>
							</p>
						</div>
						<button
							className='btn w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-900 shadow-md hover:shadow-lg uppercase text-white mb-4 md:mb-6'
							type='submit'>
							Send reset password
						</button>
						<div className='flex items-center my-2 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
							<p className='text-center font-semibold mx-4'>OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;

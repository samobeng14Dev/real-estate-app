import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import SectionTitle from "../components/SectionTitle";
import lock from "../assets/lock.jpg";
import OAuth from "../components/OAuth";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	return (
		<>
			<SectionTitle text='sign in' />
			<div className='flex justify-center flex-wrap items-center px-6 py-12 mt-10'>
				<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
					<img
						className='w-full rounded-2xl'
						src={lock}
						alt='key'
					/>
				</div>
				<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
					<form>
						<input
							className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
							type='email'
							id='email'
							value={email}
							onChange={handleChange}
							placeholder='email address'
						/>
						<div className='relative mb-6'>
							<input
								className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
								type={showPassword ? "text" : "password"}
								id='password'
								value={password}
								onChange={handleChange}
								placeholder='password'
							/>
							{showPassword ? (
								<HiOutlineEyeOff
									className='absolute right-3 top-3 text-xl cursor-pointer'
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							) : (
								<HiOutlineEye
									className='absolute right-3 top-3 text-xl cursor-pointer'
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							)}
						</div>
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							<p className='mb-6 '>
								Don't have an account yet?
								<Link
									to='signUp'
									className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 mr-2'>
									Register
								</Link>
							</p>
							<p>
								<Link
									to='/forgotPassword'
									className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Forgot password?
								</Link>
							</p>
						</div>
						<button
							className='btn w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-900 shadow-md hover:shadow-lg uppercase text-white '
							type='submit'>
							Sign In
						</button>
						<div className=' flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
							<p className='text-center font-semibold mx-4'>OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</>
	);
};

export default SignIn;

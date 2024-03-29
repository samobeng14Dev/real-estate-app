import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { toast } from "react-toastify";
import SectionTitle from "../components/SectionTitle";
import lock from "../assets/lock.jpg";
import OAuth from "../components/OAuth";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			//add identifier
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const user = userCredential.user;
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, "users", user.uid), formDataCopy);
			navigate("/");
			toast.success("sign up was successful");
		} catch (error) {
			toast.error("please check your credentials");
		}
	};
	return (
		<>
			<section className='h-screen grid place-items-center'>
				<SectionTitle text='sign up' />
				<div className='flex justify-center flex-wrap items-center px-6 py-12 mt-10'>
					<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
						<img
							className='w-full rounded-2xl'
							src={lock}
							alt='key'
						/>
					</div>
					<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
						<form onSubmit={handleSubmit}>
							<input
								className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
								type='text'
								id='name'
								value={name}
								onChange={handleChange}
								placeholder='full name'
							/>
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
									Have an account ?
									<Link
										to='/signIn'
										className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 mr-2'>
										Sign In
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
								Sign Up
							</button>
							<div className=' flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
								<p className='text-center font-semibold mx-4'>OR</p>
							</div>
							<OAuth />
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUp;

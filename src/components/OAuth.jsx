import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
	return (
		<button
			className='btn flex items-center justify-center w-full bg-red-700
         text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800
         active:bg-red-800 active:shadow-lg shadow-md hover:shadow-lg
         '>
			<FcGoogle className='text-2xl bg-white rounded-full mr-2' />
			Continue with Google
		</button>
	);
};

export default OAuth;
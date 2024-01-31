import { useState } from "react";
import SectionTitle from "../components/SectionTitle";

const CreateListing = () => {
	const [formData, setFormData] = useState({
		type: "rent",
		name: "",
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: "",
		description: "",
		offer: true,
		regularPrice: "0",
		discountedPrice: "0",
	});
	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		description,
		offer,
		regularPrice,
		discountedPrice,
	} = formData;
	const handleChange = (e) => {
		let boolean = null;
		if (e.target.value === "true") {
			boolean = true;
		}
		if (e.target.value === "false") {
			boolean = false;
		}
		//files
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				images: e.target.files,
			}));
		}
		//text, boolean,number
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}));
		}
	};
	return (
		<main className='max-w-md px-2 mx-auto'>
			<SectionTitle text='Create a listing' />
			<form>
				{/* Sell/Rent */}
				<p className='text-lg mt-6 font-semibold '>Sell/Rent</p>
				<div className='flex'>
					{/* Sell */}
					<button
						type='button'
						id='type'
						value='sale'
						onClick={handleChange}
						className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													type === "rent"
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						sell
					</button>
					{/* Rent */}
					<button
						type='button'
						id='type'
						value='rent'
						onClick={handleChange}
						className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													type === "sale"
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						rent
					</button>
				</div>
				{/* Name */}
				<p className='text-lg mt-6 font-semibold'>Name</p>
				<input
					type='text'
					id='name'
					value={name}
					onChange={handleChange}
					placeholder='name'
					maxLength='32'
					minLength='10'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
                     border-gray-300 rounded transition duration-150 ease-in-out
                      focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
				/>
				<div className='flex space-x-6 mb-6'>
					<div>
						<p className='text-lg font-semibold'>Beds</p>
						<input
							type='number'
							id='bedrooms'
							value={bedrooms}
							onChange={handleChange}
							min='1'
							max='50'
							required
							className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
							 border-gray-700 transition duration-150 ease-in-out
							  focus:gray-700 focus:bg-white focus:border-slate-600 text-center'
						/>
					</div>
					<div>
						<p className='text-lg font-semibold'>Baths</p>
						<input
							type='number'
							id='bathrooms'
							value={bathrooms}
							onChange={handleChange}
							min='1'
							max='50'
							required
							className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border
							 border-gray-700 transition duration-150 ease-in-out
							  focus:gray-700 focus:bg-white focus:border-slate-600 text-center'
						/>
					</div>
				</div>
				{/* Parking Spot*/}
				<p className='text-lg mt-6 font-semibold '>Parking Spot</p>
				<div className='flex'>
					<button
						type='button'
						id='parking'
						value={true}
						onClick={handleChange}
						className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													!parking
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						Yes
					</button>
					<button
						type='button'
						id='parking'
						value={false}
						onClick={handleChange}
						className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													parking
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						no
					</button>
				</div>
				{/* Furnished */}
				<p className='text-lg mt-6 font-semibold '>Furnished</p>
				<div className='flex'>
					<button
						type='button'
						id='furnished'
						value={true}
						onClick={handleChange}
						className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													!furnished
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						Yes
					</button>
					<button
						type='button'
						id='furnished'
						value={false}
						onClick={handleChange}
						className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													furnished
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						No
					</button>
				</div>
				{/* Address */}
				<p className='text-lg mt-6 font-semibold'>Address</p>
				<textarea
					type='text'
					id='address'
					value={address}
					onChange={handleChange}
					placeholder='address'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
                     border-gray-300 rounded transition duration-150 ease-in-out
                      focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
				/>
				{/* Description */}
				<p className='text-lg  font-semibold'>Description</p>
				<textarea
					type='text'
					id='description'
					value={description}
					onChange={handleChange}
					placeholder='description'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
                     border-gray-300 rounded transition duration-150 ease-in-out
                      focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
				/>
				{/* Offer*/}
				<p className='text-lg font-semibold '>Offer</p>
				<div className='flex mb-6'>
					<button
						type='button'
						id='offer'
						value={true}
						onClick={handleChange}
						className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													!offer
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						Yes
					</button>
					<button
						type='button'
						id='offer'
						value={false}
						onClick={handleChange}
						className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md 
                        rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                        duration-150 ease-in-out w-full ${
													offer
														? "bg-white text-black"
														: "bg-slate-600 text-white"
												}`}>
						No
					</button>
				</div>
				{/* Regular Price */}
				<div className='flex items-center mb-6'>
					<div className=''>
						<p className='text-lg font-semibold'>Regular price</p>
						<div className='flex w-full justify-center items-center space-x-6'>
							<input
								type='number'
								id='regularPrice'
								value={regularPrice}
								onChange={handleChange}
								min='50'
								max='400000000'
								required
								className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
								 border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
								focus:bg-white  focus:border-slate-600 text-center'
							/>
							{type === "rent" && (
								<div className=''>
									<p className='text-md w-full '>$/Month</p>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* Discounted Price */}
				{offer && (
					<div className='flex items-center mb-6'>
						<div className=''>
							<p className='text-lg font-semibold'>Discounted price</p>
							<div className='flex w-full justify-center items-center space-x-6'>
								<input
									type='number'
									id='discountedPrice'
									value={discountedPrice}
									onChange={handleChange}
									min='50'
									max='400000000'
									required={offer}
									className='w-full px-4 py-2 text-xl text-gray-700 bg-white border
								 border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
								focus:bg-white  focus:border-slate-600 text-center'
								/>
								{type === "rent" && (
									<div className=''>
										<p className='text-md w-full '>$/Month</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				{/* Images */}
				<div className='mb-6'>
					<p className='tex-lg font-semibold'>Images</p>
					<p className='text-gray-600'>
						The first image will be the cover (max 6)
					</p>
					<input
						type='file'
						id='images'
						onChange={handleChange}
						accept='.jpg, .png, .jpeg'
						multiple
						required
						className='w-ful px-3 py-1.5 text-gray-700 bg-white border 
						border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white
						focus:border-slate-600'
					/>
				</div>
				{/* Button */}
				<button
					type='submit'
					className='mb-6 w-full px-7 y-3 btn btn-secondary font-medium 
					uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg'>
					Create Listing
				</button>
			</form>
		</main>
	);
};

export default CreateListing;

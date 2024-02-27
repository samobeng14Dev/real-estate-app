import React, { useState } from "react";

const RequestProperty = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you can implement your logic to send the request to the property owner
		console.log("Request submitted:", { fullName, email, message });
		// You can also add further logic like validation before submitting the request
	};

	return (
		<div className='bg-gray-100 py-10'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-3xl font-bold mb-6'>Request Property</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label
							htmlFor='fullName'
							className='block text-lg font-medium'>
							Full Name
						</label>
						<input
							type='text'
							id='fullName'
							className='w-full border-gray-300 rounded-md p-2'
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-lg font-medium'>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							className='w-full border-gray-300 rounded-md p-2'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='message'
							className='block text-lg font-medium'>
							Message
						</label>
						<textarea
							id='message'
							className='w-full border-gray-300 rounded-md p-2'
							rows='4'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required></textarea>
					</div>
					<div>
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
							Submit Request
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RequestProperty;

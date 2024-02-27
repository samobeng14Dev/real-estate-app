import React from "react";
import { FaWhatsapp, FaFacebook, FaEnvelope, FaTwitter } from "react-icons/fa";

const Contact = () => {
	return (
		<div className='bg-gray-100 py-10'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
				<div className='space-y-6'>
					<div className='flex items-center space-x-4'>
						<a
							href='https://wa.me/1234567890'
							target='_blank'
							rel='noopener noreferrer'>
							<div className='w-12 h-12 flex justify-center items-center rounded-full bg-green-500 text-white text-2xl'>
								<FaWhatsapp />
							</div>
						</a>
						<div>
							<p className='font-medium'>WhatsApp</p>
							<a
								href='https://wa.me/1234567890'
								className='text-blue-500'>
								+1 (123) 456-7890
							</a>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<a
							href='https://facebook.com/yourpage'
							target='_blank'
							rel='noopener noreferrer'>
							<div className='w-12 h-12 flex justify-center items-center rounded-full bg-blue-700 text-white text-2xl'>
								<FaFacebook />
							</div>
						</a>
						<div>
							<p className='font-medium'>Facebook</p>
							<a
								href='https://facebook.com/yourpage'
								className='text-blue-500'>
								facebook.com/yourpage
							</a>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<a
							href='mailto:info@example.com'
							target='_blank'
							rel='noopener noreferrer'>
							<div className='w-12 h-12 flex justify-center items-center rounded-full bg-red-600 text-white text-2xl'>
								<FaEnvelope />
							</div>
						</a>
						<div>
							<p className='font-medium'>Email</p>
							<a
								href='mailto:info@example.com'
								className='text-blue-500'>
								info@example.com
							</a>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<a
							href='https://twitter.com/youraccount'
							target='_blank'
							rel='noopener noreferrer'>
							<div className='w-12 h-12 flex justify-center items-center rounded-full bg-blue-400 text-white text-2xl'>
								<FaTwitter />
							</div>
						</a>
						<div>
							<p className='font-medium'>Twitter</p>
							<a
								href='https://twitter.com/youraccount'
								className='text-blue-500'>
								@youraccount
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;

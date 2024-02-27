import React from "react";

const About = () => {
	return (
		<>
			<div className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center mb-6'>
				<h1 className='text-4xl font-bold leading-none tracking-tight sm-text-6xl'>
					we love
				</h1>
				<div className='stats bg-primary shadow'>
					<div className='stat'>
						<div className='stat-title text-primary-content text-4xl font-bold tracking-widest'>
							Samo
						</div>
					</div>
				</div>
			</div>
			<div className='bg-gray-100 py-10'>
				<div className='max-w-4xl mx-auto px-4'>
					<h1 className='text-3xl font-bold mb-6'>About Us</h1>
					<p className='text-lg mb-4'>
						Welcome to Samo Estates, your go-to destination for all things real
						estate. Whether you're looking to buy, sell, or rent a property,
						we've got you covered.
					</p>
					<p className='text-lg mb-4'>
						At Samo Estates, we strive to provide the best possible experience
						for our users. Our team of experienced professionals is dedicated to
						helping you find the perfect property or sell your existing one
						quickly and efficiently.
					</p>
					<p className='text-lg mb-4'>
						With our user-friendly interface and comprehensive listings, finding
						your dream home has never been easier. And if you're selling, our
						marketing expertise will ensure that your property gets the exposure
						it deserves.
					</p>
					<p className='text-lg mb-4'>
						Thank you for choosing Samo Estates. We look forward to serving you
						and helping you achieve your real estate goals.
					</p>
				</div>
			</div>
		</>
	);
};

export default About;

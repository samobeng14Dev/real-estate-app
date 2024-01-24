const SectionTitle = ({ text }) => {
	return (
		<div className='border-b border-base-300 pb-5'>
			<h1 className='text-3xl capitalize text-center mt-6 tracking-wider font-bold'>
				{text}
			</h1>
		</div>
	);
};

export default SectionTitle;

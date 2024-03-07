import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const Layout = () => {
	const [layout, setLayout] = useState("grid");
	const setActiveStyles = (pattern) => {
		return `text-xl btn btn-circle btn-sm ${
			pattern === layout
				? "btn-primary text-primary-content"
				: "btn-ghost text-based-content"
		}`;
	};
	return (
		<>
			{/* HEADER */}
			<div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
				<h4 className='font-medium text-medium'>Welcome to Samo Estates</h4>
				<div className='flex gap-x-2'>
					<button
						type='button'
						onClick={() => setLayout("grid")}
						className={setActiveStyles("grid")}>
						<BsFillGridFill />
					</button>
					<button
						type='button'
						onClick={() => setLayout("list")}
						className={setActiveStyles("list")}>
						<BsList />
					</button>
				</div>
			</div>
		</>
	);
};

export default Layout;

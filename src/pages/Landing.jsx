import { useState } from "react";
import Slider from "../components/Slider";

import { BsFillGridFill, BsList } from "react-icons/bs";
import { LayoutGrid, LayoutList } from "../components";

const Landing = () => {
	const [layout, setLayout] = useState("list");
	const setActiveStyles = (pattern) => {
		return `text-xl btn btn-circle btn-sm ${
			pattern === layout
				? "btn-secondary text-primary-content"
				: "btn-ghost text-based-content"
		}`;
	};

	return (
		<>
			<Slider />
			{/* HEADER */}
			<div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
				<h4 className='text-center items-center lg:font-medium text-medium'>
					Welcome to Samo Estates
				</h4>
				<div className='hidden sm:flex md:flex lg:flex gap-x-2 '>
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
			<div>{layout === "grid" ? <LayoutGrid /> : <LayoutList />}</div>
		</>
	);
};

export default Landing;

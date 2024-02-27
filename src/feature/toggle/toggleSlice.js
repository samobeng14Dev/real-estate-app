import { createSlice } from "@reduxjs/toolkit";

const themes = {
	cyberpunk: "cyberpunk",
	light: "light",
};
const getThemesFromLocalStorage = () => {
	const theme = localStorage.getItem("theme") || themes.light;
	document.documentElement.setAttribute("data-theme", theme);
	return theme;
};
const initialState = {
	theme: getThemesFromLocalStorage(),
};

const toggleSlice = createSlice({
	name: "toggle",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			const { cyberpunk, light } = themes;
			state.theme = state.theme === light ? cyberpunk : light;
			document.documentElement.setAttribute("data-theme", state.theme);
			localStorage.setItem("theme", state.theme);
		},
	},
});

export const { toggleTheme } = toggleSlice.actions;
export default toggleSlice.reducer;

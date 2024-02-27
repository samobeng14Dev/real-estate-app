import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./feature/toggle/toggleSlice";

export const store = configureStore({
	reducer: { toggleState: toggleReducer },
});

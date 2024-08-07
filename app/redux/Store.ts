import { configureStore } from "@reduxjs/toolkit";
import colorState from "./ColorSlice";
import { ColorState } from "./ColorSlice";

export interface Store {
    colorState: ColorState
}

export const store = configureStore({
    reducer: {
        colorState: colorState.reducer,
    },
});
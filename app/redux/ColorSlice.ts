import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getColor from "../functions/getColor";

export interface ColorState {
    colors: string[]
}

interface ActionAdd {
    color: string,
    index: number
}

const initialState: ColorState = {
    colors: [getColor(), getColor()],
};

const colorState = createSlice({
    name: "colorState",
    initialState,
    reducers: {
        setColor: (
            state,
            action: PayloadAction<ActionAdd>,
        ) => {
            const arrBefore = [];
            const arrAfter = [];
            const pivot = action.payload.color;
            for (let i = 0; i < action.payload.index + 1; i++) {
                arrBefore.push(state.colors[i]);
            };
            for (let i = action.payload.index + 1; i < state.colors.length; i++) {
                arrAfter.push(state.colors[i]);
            };
            state.colors = arrBefore.concat(pivot, arrAfter);
        },
    }
})

export default colorState;
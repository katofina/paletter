import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getColor from "../functions/getColor";

export interface ColorState {
  colors: string[];
}

interface ActionAdd {
  color: string;
  index: number;
}

const initialState: ColorState = {
  colors: [getColor(), getColor()],
};

const colorState = createSlice({
  name: "colorState",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<ActionAdd>) => {
      const arrBefore = state.colors.filter(
        (item, index) => index <= action.payload.index,
      );
      const arrAfter = state.colors.filter(
        (item, index) => index > action.payload.index,
      );
      const pivot = action.payload.color;
      state.colors = arrBefore.concat(pivot, arrAfter);
    },
    deleteColor: (state, action: PayloadAction<number>) => {
      const arrBefore = state.colors.filter(
        (item, index) => index < action.payload,
      );
      const arrAfter = state.colors.filter(
        (item, index) => index > action.payload,
      );
      state.colors = arrBefore.concat(arrAfter);
    },
  },
});

export default colorState;

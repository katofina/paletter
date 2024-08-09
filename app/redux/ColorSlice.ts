import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getColor from "../functions/getColor";
import getColorObject from "../functions/getColorObject";

export interface ObjectColor {
  color: string;
  locked: boolean;
}

export interface ColorState {
  colors: Array<ObjectColor>;
}

interface ActionAdd {
  index: number;
  lock: boolean;
}

const initialState: ColorState = {
  colors: getColorObject(),
};

const colorState = createSlice({
  name: "colorState",
  initialState,
  reducers: {
    changeColors: (state) => {
      state.colors = state.colors.map((item) => {
        if (item.locked === false) {
          return { ...item, color: getColor() };
        } else return item;
      });
    },

    setLock: (state, action: PayloadAction<ActionAdd>) => {
      const index = action.payload.index;
      state.colors[index].locked = action.payload.lock;
    },
  },
});

export default colorState;

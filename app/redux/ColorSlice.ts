import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getColor from "../functions/getColor";
import getColorObject from "../functions/getColorObject";

export interface ObjectColor {
  color: string;
  locked: boolean;
  id: string;
}

export interface ColorState {
  colors: Array<ObjectColor>;
  stackColors: Array<Array<ObjectColor>>;
  cancelColors: Array<Array<ObjectColor>>;
}

interface ActionAdd {
  index: number;
  lock: boolean;
}

const initialState: ColorState = {
  colors: getColorObject(),
  stackColors: [],
  cancelColors: [],
};

const colorState = createSlice({
  name: "colorState",
  initialState,
  reducers: {
    changeColors: (state) => {
      const newArr = state.colors.map((item) => {
        if (item.locked === false) {
          return { ...item, color: getColor() };
        } else return item;
      });
      state.colors = newArr;
      state.stackColors.push(newArr);
    },

    setLock: (state, action: PayloadAction<ActionAdd>) => {
      const index = action.payload.index;
      state.colors[index].locked = action.payload.lock;
    },

    setArray: (state, action: PayloadAction<Array<ObjectColor>>) => {
      const newArr = action.payload;
      state.colors = newArr;
      state.stackColors.push(newArr);
    },

    pushColors: (state) => {
      state.stackColors.push(state.colors);
    },

    cancelColors: (state) => {
      if (state.stackColors.length > 1) {
        const cancel = state.stackColors.pop()!;
        state.colors = state.stackColors[state.stackColors.length - 1];
        state.cancelColors.push(cancel);
      }
    },

    forwardColors: (state) => {
      if (state.cancelColors.length > 0) {
        const forward = state.cancelColors.pop()!;
        state.colors = forward;
        state.stackColors.push(forward);
      }
    },
  },
});

export default colorState;

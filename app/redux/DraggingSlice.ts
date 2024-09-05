import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragState {
  id: string | null;
  dragY?: number | undefined;
}

const initialState: DragState = {
  id: null,
};

const dragState = createSlice({
  name: "dragState",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
    setDragY: (state, action: PayloadAction<number | undefined>) => {
      state.dragY = action.payload;
    },
  },
});

export default dragState;

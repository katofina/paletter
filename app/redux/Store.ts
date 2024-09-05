import { configureStore } from "@reduxjs/toolkit";
import colorState from "./ColorSlice";
import { ColorState } from "./ColorSlice";
import authState, { AuthState } from "./AuthSlice";
import dragState, { DragState } from "./DraggingSlice";

export interface Store {
  colorState: ColorState;
  authState: AuthState;
  dragState: DragState;
}

export const store = configureStore({
  reducer: {
    colorState: colorState.reducer,
    authState: authState.reducer,
    dragState: dragState.reducer,
  },
});

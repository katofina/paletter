import { configureStore } from "@reduxjs/toolkit";
import colorState from "./ColorSlice";
import { ColorState } from "./ColorSlice";
import authState, { AuthState } from "./AuthSlice";

export interface Store {
  colorState: ColorState;
  authState: AuthState;
}

export const store = configureStore({
  reducer: {
    colorState: colorState.reducer,
    authState: authState.reducer,
  },
});

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  email: null,
};

export interface AuthState {
  email: null | string;
}

const authState = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
  },
});

export default authState;

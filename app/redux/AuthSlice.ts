import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: null,
};

export interface AuthState {
  token: null | string;
}

const authState = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export default authState;

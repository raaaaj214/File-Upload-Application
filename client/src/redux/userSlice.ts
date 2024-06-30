// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "../types/types";

export interface ReduxUserData {
  isLoggedIn: boolean;
  user: user | null;
}

const initialState: ReduxUserData = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === 'true',
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userExists: (state, action: PayloadAction<user>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('isLoggedIn', 'true')
    },
    userNotExists: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
});

export const { userExists, userNotExists } = userSlice.actions;
export default userSlice.reducer;

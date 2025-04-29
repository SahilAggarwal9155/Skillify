import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserData: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;

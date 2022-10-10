import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoginStatus(state, action) {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const { changeLoginStatus, logOut } = authSlice.actions;
export default authSlice.reducer;

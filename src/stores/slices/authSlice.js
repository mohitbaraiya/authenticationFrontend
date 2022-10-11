import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLogin: false,
  token: "",
  user: {
    username: "",
    fullName: "",
    picture: "",
  },
};
if (localStorage.getItem("user")) {
  const { user, token } = JSON.parse(localStorage.getItem("user"));
  initialState = {
    isLogin: true,
    token,
    user,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoginStatus(state, action) {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.token,
          user: action.payload.user,
        })
      );
    },
    logOut(state) {
      state.isLogin = false;
      localStorage.removeItem("user");
      state.token = "";
    },
  },
});

export const { changeLoginStatus, logOut } = authSlice.actions;
export default authSlice.reducer;

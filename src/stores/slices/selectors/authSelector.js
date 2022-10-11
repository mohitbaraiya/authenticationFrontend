// authSelectors
const isLoginSelector = (state) => state.auth.isLogin;

const tokenSelector = (state) => state.auth.token;
const userSelector = (state) => state.auth.user;

export { isLoginSelector, tokenSelector, userSelector };

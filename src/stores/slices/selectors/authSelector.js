// authSelectors
const isLoginSelector = (state) => state.auth.isLogin;

const tokenSelector = (state) => state.auth.token;

export { isLoginSelector, tokenSelector };

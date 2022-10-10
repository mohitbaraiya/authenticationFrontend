import React from "react";
// element import
import ResolveRouter from "./router/ResolveRouter";

import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { isLoginSelector } from "./stores/slices/selectors/authSelector";

// styles
import "react-toastify/dist/ReactToastify.css";

function App() {
  let isLogin = useSelector(isLoginSelector);

  return (
    <div>
      <ResolveRouter isLogin={isLogin} />
      <ToastContainer />
    </div>
  );
}

export default App;

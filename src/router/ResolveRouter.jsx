import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { login, notLogin } from "./accessType";
import { allRoutes } from "./routes";

const ResolveRouter = ({ isLogin }) => {
  const filter = isLogin ? login : notLogin;
  const resolveRotes = allRoutes.filter((route) =>
    route.accessType.includes(filter)
  );
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLogin ? "welcome" : "login"} />}
      />
      {resolveRotes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.Element />} />
      ))}
    </Routes>
  );
};

export default ResolveRouter;

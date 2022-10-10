import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import WelcomePage from "../pages/WelcomePage";
import { login, notLogin } from "./accessType";

export const allRoutes = [
  {
    path: "login",
    Element: Login,
    accessType: [notLogin],
  },
  {
    path: "signup",
    Element: Signup,
    accessType: [notLogin],
  },
  {
    path: "welcome",
    Element: WelcomePage,
    accessType: [login],
  },
  {
    path: "*",
    Element: NotFound,
    accessType: [login, notLogin],
  },
];

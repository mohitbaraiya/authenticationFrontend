import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "../../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = ({ className }) => {
  const clientId =
    "665254928449-sant85ooujlrvulhge1jot1senss0bju.apps.googleusercontent.com";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const responseGoogle = async (response) => {
    const {
      profileObj: { email: username, name: full_name, imageUrl: picture },
    } = response;

    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/google-auth/recieve-token",
      {
        id_token: response.getAuthResponse().id_token,
      }
    );

    toast(res.data.message);
    if (res.data.message === "success") {
      dispatch(
        changeLoginStatus({
          isLogin: true,
          token: res.data.token,
          user: { username, full_name, picture },
        })
      );
      navigate("/welcome");
    }
  };
  const failure = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      className={className}
      clientId={clientId}
      buttonText=""
      onSuccess={responseGoogle}
      onFailure={failure}
      cookiePolicy={"single_host_origin"}
    >
      <svg
        fill="currentColor"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z" />
      </svg>
    </GoogleLogin>
  );
};

export default GoogleAuth;

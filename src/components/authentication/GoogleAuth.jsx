import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

const GoogleAuth = () => {
  const clientId =
    "665254928449-sant85ooujlrvulhge1jot1senss0bju.apps.googleusercontent.com";

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
    console.log(response);
    console.log();
    let data = await axios.post(
      "http://localhost:5000/api/v1/auth/google-auth/recieve-token",
      {
        id_token: response.getAuthResponse().id_token,
      }
    );

    console.log(data);
  };
  const failure = (response) => {
    console.log(response);
  };
  return (
    <div className="my-3">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={failure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleAuth;

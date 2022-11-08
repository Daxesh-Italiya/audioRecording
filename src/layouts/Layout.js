import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Services } from "../api/service";
import { Token } from "../utils/constants";
const Layout = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    if (window.location.href.includes("auth")) {
      const perams = window.location.href
        .replace("http://localhost:3000/auth/?code=", "")
        .replace("#_=_", "");
      console.log(perams);
      Token.code = perams;
      (async () => {
        try {
          const res = await Services.post(
            "/oauth2/token?grant_type=authorization_code&redirect_uri=http://localhost:3000/auth/&code=" +
              perams,
            { "Content-Type": "application/x-www-form-urlencoded" }
          );
          setResponse(res?.data);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [window.location.href]);

  return (
    <Fragment>
      <ToastContainer />
      <div
        style={{
          padding: "50px",
          margin: "56px",
          background: "#ebebeb",
          borderRadius: "10px",
          boxShadow: "0px 0px 14px #777d7342",
        }}
      >
        {response?.refresh_token && (
          <Fragment>
            <p style={{ fontWeight: "800", color: "#606060" }}>Access Token</p>
            <p
              style={{
                wordBreak: "break-word",
                color: "#838383",
                border: "1px solid #a3a3a3",
                padding: "13px",
                borderRadius: "10px",
                marginBottom: "50px",
              }}
            >
              {response?.access_token}
            </p>
            <p style={{ fontWeight: "800", color: "#606060" }}>Refresh Token</p>
            <p
              style={{
                wordBreak: "break-word",
                color: "#838383",
                border: "1px solid #a3a3a3",
                padding: "13px",
                borderRadius: "10px",
                marginBottom: "50px",
              }}
            >
              {" "}
              {response?.refresh_token}
            </p>
          </Fragment>
        )}

        {!response?.refresh_token && (
          <a
            style={{
              background: "#282727",
              padding: "9px 25px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "10px",
            }}
            href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238RRW&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight%20oxygen_saturation%20respiratory_rate%20temperature&expires_in=604800"
          >
            Get Access Token
          </a>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(Layout);

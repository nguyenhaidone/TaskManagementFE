import React from "react";
import "./GoogleLogin.scss";
import { useTranslation } from "react-i18next";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = () => {
  const { t } = useTranslation();

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="532459309976-u4anma0797gt5vfgahcran9fib07vdi2.apps.googleusercontent.com"
    //   render={(renderProps) => (
    //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
    //       {t("text.loginByGoogle")}
    //     </button>
    //   )}
      buttonText={t("text.loginByGoogle")}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default React.memo(GoogleLoginButton);

import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button } from "react-bootstrap";
import "./AppBar.scss";

const AppBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar-app">
      <h1>{t("text.hello")}</h1>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant={i18n.language === "vn" ? "danger" : "secondary"}
          onClick={() => {
            changeLanguage("vn");
          }}
        >
          {t("text.vn")}
        </Button>
        <Button
          variant={i18n.language === "en" ? "danger" : "secondary"}
          onClick={() => {
            changeLanguage("en");
          }}
        >
          {t("text.en")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default React.memo(AppBar);

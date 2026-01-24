import "./Header.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="logo">{i18n.t("header.title")}</div>

      <nav className="header-actions">
        <span className="user">{i18n.t("header.language")}:</span>
        <button onClick={() => changeLanguage("pt")}>PT</button>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("fr")}>FR</button>
        <button onClick={() => changeLanguage("es")}>ES</button>

      </nav>
    </header>
  );
}
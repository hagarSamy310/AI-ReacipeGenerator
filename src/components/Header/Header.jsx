import chefBot from "../../assets/chefBot.png";
import "./Header.css";

export function Header({ language, toggleLanguage }) {
	return (
		<header>
			<img src={chefBot} alt="Chef Bot" />
			<h1>Chef Bot</h1>
			<button className="lang-toggle" onClick={toggleLanguage}>
				<span className={language === "en" ? "active" : ""}>EN</span>
				<span className={language === "ar" ? "active" : ""}>AR</span>
			</button>
		</header>
	);
}

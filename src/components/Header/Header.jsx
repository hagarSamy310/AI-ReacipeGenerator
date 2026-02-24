import chefBot from "../../assets/chefBot.png";
import "./Header.css"

export function Header() {
  return (
    <header>
      <img src={chefBot} alt="Chef Bot" />
      <h1>Chef Claude</h1>
    </header>
  );
}

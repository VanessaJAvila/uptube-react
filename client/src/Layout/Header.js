import "./Header.scss";
import logo from "./logo.png";

function Header() {
    return <div className={"Header"}>
        <div className={"logo"}>
        <img src={logo} alt ="logo UpTube"/>
        <span>UpTube</span>
            </div>
    </div>
}

export default Header;
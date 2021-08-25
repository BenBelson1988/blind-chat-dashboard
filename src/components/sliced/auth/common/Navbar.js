import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../../logo.svg";

export default () => {
  return (
    <div className={"Navbar_sticky"}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "70px", position: "absolute", left: "40px" }}
      />
      <ul className={"li"}>
        <Link className={"Link"}>Home</Link>
        <Link className={"Link"}>About</Link>
        <Link className={"Link"}>Contact</Link>
        <Link className={"Link"}>FAQ</Link>
      </ul>
    </div>
  );
};

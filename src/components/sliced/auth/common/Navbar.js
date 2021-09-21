import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../../logo.svg";
import { useDispatch } from "react-redux";
import "../UI/Home.css";
import authSlicer, { signOut } from "../../../../stores/slices/authSlicer";

export default () => {
  const dispatch = useDispatch();
  return (
    <div className={"Navbar_sticky"}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "70px", position: "absolute", left: "40px" }}
      />
      <button
        className={"button_signout"}
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign out
      </button>
      <ul className={"li"}>
        <Link className={"Link"}>Home</Link>
        <Link className={"Link"}>About</Link>
        <Link className={"Link"}>Contact</Link>
        <Link className={"Link"}>FAQ</Link>
      </ul>
    </div>
  );
};

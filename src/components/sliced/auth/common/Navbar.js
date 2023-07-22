import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import "../UI/Home.css";
import { signOut } from "../../../../stores/slices/authSlicer";
import { StatsH2 } from "../../../styled/Heading";
import { NavbarLogo } from "../../../styled/Logo";


export default () => {
  const useremail = useSelector(({ auth }) => auth.email) || "";
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={"Navbar_sticky"}>
      <NavbarLogo
        onClick={() => {
          history.push("/home/stats");
        }}
        src={logo}
        alt="Logo"
        style={{
          width: "70px",
          position: "absolute",
          left: "40px",
          cursor: "pointer",
        }}
      />
      <StatsH2 style={{ position: "absolute", left: "200px" }}>
        Hi, {useremail}
      </StatsH2>
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

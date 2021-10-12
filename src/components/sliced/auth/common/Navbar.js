import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Navbar.css";
import logo from "../../../../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import "../UI/Home.css";
import authSlicer, { signOut } from "../../../../stores/slices/authSlicer";
import { useEffect, useState } from "react";
import { StatsH2 } from "../../../styled/Heading";

export default () => {
  const useremail = useSelector(({ auth }) => auth.email);
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    if (useremail === "belson1988@gmail.com") setActiveUser("Ben");
  }, [useremail]);

  return (
    <div className={"Navbar_sticky"}>
      <img
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
        Hi, {activeUser}
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

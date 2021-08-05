import { Link } from "react-router-dom";
import "../auth/UI/Navbar.css";

export default () => {
  return (
    <div className={"Navbar_sticky"}>
      <ul className={"li"}>
        <Link className={"Link"}>Some</Link>
        <Link className={"Link"}>Navbar</Link>
        <Link className={"Link"}>Links</Link>
        <Link className={"Link"}>Here</Link>
      </ul>
    </div>
  );
};

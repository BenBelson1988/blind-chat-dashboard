import "../UI/Loader.css";
import logo from "../../../../logo.svg";

export default () => {
  return (
    <div className={"Loader"}>
      <img src={logo} alt="Logo" className={"loader-logo"} />
    </div>
  );
};

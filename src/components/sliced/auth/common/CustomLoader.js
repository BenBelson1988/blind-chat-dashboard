import "../UI/CustomLoader.css";
import logo from "../../../../logo.svg";

export default (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: "15px",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        {props.title}
      </p>
      <img src={logo} alt="Logo" className={"loader-logo-sec"} />
    </div>
  );
};

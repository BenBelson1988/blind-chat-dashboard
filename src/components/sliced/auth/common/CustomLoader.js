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
        backgroundImage:
          "linear-gradient(135deg, rgba(64,85,83,0.2) 0%, rgba(0,51,54,0.2) 85%)",
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

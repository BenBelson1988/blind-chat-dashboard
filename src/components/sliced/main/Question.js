export default (props) => {
  console.log(props.answers);

  return (
    <div
      style={{
        backgroundImage:
          " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "15px",
      }}
    >
      <h2 style={{ color: "white" }}>
        {props.index + 1}. {props.body}
      </h2>
      <h3 style={{ color: "lightgray" }}>Answers</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {props.answers.map((answer) => {
          return (
            <p
              style={{
                minWidth: "40px",
                fontWeight: "bolder",
                paddingRight: "5px",
                paddingLeft: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
                marginLeft: "20px",
                marginRight: "20px",
                color: "white",
                borderRadius: "15px",
                backgroundImage:
                  "linear-gradient(135deg, rgba(64,85,83,0.6334908963585435) 0%, rgba(0,51,54,0.6474964985994398) 85%)",
              }}
            >
              {answer.body}
            </p>
          );
        })}
      </div>
    </div>
  );
};

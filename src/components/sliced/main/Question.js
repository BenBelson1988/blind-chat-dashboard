export default (props) => {
  console.log(props);

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
      <img
        src={props.imageUrl}
        alt={"png"}
        style={{ width: "70px", height: "70px" }}
      />
      <h2 style={{ color: "white" }}>
        {props.index + 1}. {props.body}
      </h2>

      <div>
        <h3 style={{ color: "lightgray", marginBottom: "-5px" }}>Answers</h3>
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
              <div>
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
                    boxShadow: "0 0 0 1pt grey",
                    backgroundImage:
                      "linear-gradient(135deg, rgba(64,85,83,0.6334908963585435) 0%, rgba(0,51,54,0.6474964985994398) 85%)",
                  }}
                >
                  {answer.body}
                </p>
                {answer.iceBreaker === "" ? (
                  ""
                ) : (
                  <h5 style={{ color: "lightgray", marginBottom: "-5px" }}>
                    Ice Breaker-
                  </h5>
                )}
                <p
                  style={{
                    color: "white",
                    fontSize: "13px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  {answer.iceBreaker}
                </p>
                <h6
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Effects-
                </h6>
                {answer.effects.map((effect) => {
                  return (
                    <p
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {effect.feature} - {effect.value}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

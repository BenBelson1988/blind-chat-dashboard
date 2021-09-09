export default (answer) => {
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
        <>
          <h5 style={{ color: "white", marginBottom: "-5px" }}>Ice Breaker-</h5>

          <p
            style={{
              color: "lightgray",
              fontSize: "13px",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            {answer.iceBreaker}
          </p>
        </>
      )}
      <h5
        style={{
          margin: "0",
          padding: "0",
        }}
      >
        Effects-
      </h5>
      {answer.effects.map((effect) => {
        return (
          <p
            style={{
              fontSize: "13px",
              color: "lightgray",
            }}
          >
            {effect.feature} - {effect.value}
          </p>
        );
      })}
    </div>
  );
};

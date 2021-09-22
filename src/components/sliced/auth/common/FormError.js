export default (error) => {
  return error.type === "Question" ? (
    <p style={{ color: "#f46c96" }}>
      Question cannot be empty, please enter question!
    </p>
  ) : error.type === "Answer" ? (
    <p style={{ color: "#f46c96" }}>
      One or more answers seem to be empty, please fill in all the answers!
    </p>
  ) : error.type === "iceBreaker" ? (
    <p style={{ color: "#f46c96" }}>
      One or more iceBreakers seem to be empty, please fill in all the
      iceBreakers!
    </p>
  ) : (
    <p style={{ color: "#f46c96" }}>Something went wrong, Please try again.</p>
  );
};

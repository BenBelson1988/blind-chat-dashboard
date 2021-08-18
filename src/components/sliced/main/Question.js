export default (props) => {
  console.log(props);
  return (
    <div className={"question-div"}>
      <h2 style={{ color: "white" }}>{props.body}</h2>
    </div>
  );
};

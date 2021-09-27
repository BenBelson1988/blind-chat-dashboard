export default (props) => {
  return (
    <div
      style={{
        zIndex: "10",
        minWidth: "500px",
        minHeight: "250px",
        backgroundImage:
          " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
        position: "fixed",
        left: "50%",
        transform: "translate(-50%, 0)",
        boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      Test
    </div>
  );
};

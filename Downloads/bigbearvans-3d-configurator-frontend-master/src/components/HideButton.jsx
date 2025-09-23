
 const HideButton = ({ toggleControl, isPivotoff }) => {
    return (
      <button onClick={toggleControl} className="btn btn-primary">
        {isPivotoff ? "Save" : "Edit"}
      </button>
    );
  };
  
  export default HideButton;
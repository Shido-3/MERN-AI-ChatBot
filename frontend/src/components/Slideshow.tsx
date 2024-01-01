import React from "react";

const Slideshow = () => {
  return (
    <div className="slideshow-div">
      <div className="wrapper">
        <img src="mongodb.png" alt="mongodb logo" style={{ width: "400px" }} />
        <img src="express.png" alt="express logo" style={{ width: "400px" }} />
        <img src="react.png" alt="react logo" style={{ width: "400px" }} />
        <img src="nodejs.png" alt="nodejs logo" style={{ width: "400px" }} />
      </div>
    </div>
  );
};

export default Slideshow;
import * as React from "react";
import SomethingWentWrong from "../../lib/something_went_wrong.jpg";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-wrapper">
      <div className="error">
        <div className="something-went-wrong-wrapper">
          <img
            src={SomethingWentWrong}
            alt="something went wrong banner"
            className="something-went-wrong"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;

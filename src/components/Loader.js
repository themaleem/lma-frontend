import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
    // <div className='spinner-border' role='status'>
    //   <span className='visually-hidden'>Loading...</span>
    // </div>
  );
};

export default Loader;

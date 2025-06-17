import { JSX, useCallback, useState } from "react";
const Button = (): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
      }}>
      <h2>Button</h2>
      <div>
        <h3>Basic</h3>
        <hr />
        <button className='btn btn__primary'>Primary</button>
        <button className='btn btn__secondary'>Secondary</button>
      </div>
    </div>
  );
};

export default Button;

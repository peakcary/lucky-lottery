import React, { useState } from "react";
import Scratch from "react-scratch-perfect";
import "./index.css";

import imgA from './assets/aaa.jpg';

const ScratchCardComponent = () => {
  const handleChange = () => {};
  const onSuccess = () => {};
  return (
    <div style={{ textAlign: "center" }}>
    
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Scratch
          color="#808080"
          img={imgA}
          round={[100, 50, 100, 50]}
          size={40}
          imgRepeat="height"
          percentage={70}
          clear={false}
          mode="move"
          onChange={handleChange}
          onSuccess={onSuccess}
          className="scratch"
        >
          <div className="s1">一等奖</div>
        </Scratch>
      </div>
    </div>
  );
};

export default ScratchCardComponent;

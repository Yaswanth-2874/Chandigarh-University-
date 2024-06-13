import React, { useState } from "react";

function InputBox(props) {
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255, 0.1)"
  );
  const [fontColor, setFontColor] = useState("#FFF");
  const { placeholder, type, value, changeHandler } = props;
  return (
    <input
      type={type}
      className={fontColor === "#FFF" ? "input" : "input black"}
      placeholder={placeholder}
      value={value}
      style={{ backgroundColor: backgroundColor, color: fontColor }}
      onFocus={() => {
        setBackgroundColor("#fff");
        setFontColor("black");
      }}
      onBlur={() => {
        setBackgroundColor("rgba(255, 255, 255, 0.1)");
        setFontColor("#FFF");
      }}
      onChange={(e) => changeHandler(e.target.value)}
      required
    />
  );
}

export default InputBox;

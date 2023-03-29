import React, { useState } from "react";
import cl from "./Checkbox.module.scss";
import { IoIosCheckmark, IoIosCheckmarkCircle } from "react-icons/io";

export default function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxClasses = [cl.checkbox, cl[`p${props.priority}`]].join(" ");
  const checkmarkClasses = [cl.checkmarkIcon, cl[`p${props.priority}`]].join(
    " "
  );

  let icon;
  isChecked
    ? (icon = <IoIosCheckmarkCircle className={checkmarkClasses} />)
    : (icon = <IoIosCheckmark className={checkmarkClasses} />);

  return (
    <div className={cl.checkboxContainer}>
      <button
        className={checkboxClasses}
        onClick={() => setIsChecked(!isChecked)}
      >
        {icon}
      </button>
    </div>
  );
}

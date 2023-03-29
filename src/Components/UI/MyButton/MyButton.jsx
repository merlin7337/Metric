import React from "react";
import classes from "./MyButton.module.scss";

export default function MyButton({ children, ...props }) {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
}

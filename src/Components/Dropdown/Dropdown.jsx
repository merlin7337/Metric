import React from "react";
import cl from "./Dropdown.module.scss";
import cx from "classnames";

export default function Dropdown({ children, visibility, mix }) {
  return (
    <div className={cx(`${cl.dropdown} ${visibility ? cl.active : ""}`, mix)}>
      {children}
    </div>
  );
}

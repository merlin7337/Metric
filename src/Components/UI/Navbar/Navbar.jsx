import React from "react";
import cl from "./Navbar.module.scss";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import Search from "../Search/Search";
import useSidebar from "../../../hooks/useSidebar";

export default function Navbar() {
  const [sidebarVisibility, handleSetSidebarVisibility] = useSidebar();
  return (
    <div className={cl.navbar}>
      <button
        className={cl.menuButton}
        onClick={() => handleSetSidebarVisibility(!sidebarVisibility)}
      >
        <FiMenu className={cl.menuIcon} />
      </button>
      <NavLink className={cl.homeButton} to="/Metric/today">
        <GrHomeRounded className={cl.homeIcon} />
      </NavLink>
      <Search />
    </div>
  );
}

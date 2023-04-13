import React, { useContext } from "react";
import cl from "./Navbar.module.scss";
import { SidebarContext } from "../../../context";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import Search from "../../Search/Search";

export default function Navbar() {
  const { sidebarVisibility, setSidebarVisibility } =
    useContext(SidebarContext);
  return (
    <div className={cl.navbar}>
      <button
        className={cl.menuButton}
        onClick={() => setSidebarVisibility(!sidebarVisibility)}
      >
        <FiMenu className={cl.menuIcon} />
      </button>
      <NavLink className={cl.homeButton} to="/today">
        <GrHomeRounded className={cl.homeIcon} />
      </NavLink>
      <Search />
    </div>
  );
}

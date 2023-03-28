import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AaharRasoiLogo from "../assets/AaharRasoi.png";

function AppBar() {
  const activeLink =
    "bg-orange-500 rounded-lg w-full text-center p-1 font-bold text-white tracking-widest transition-all duration-300";
  const nonActiveLink =
    "border border-orange-500 rounded-lg w-full text-center p-1 font-bold text-orange-500 tracking-widest transition-all duration-300";

  return (
    <div className="bg-slate-100 w-1/4 h-full border-r border-orange-400">
      <div className="p-7">
        <img src={AaharRasoiLogo} alt="logo" />
      </div>
      <div className="flex flex-col gap-2 p-5 justify-center items-center">
        <NavLink
          exact="true"
          to="/menu"
          className={({ isActive }) => (isActive ? activeLink : nonActiveLink)}
        >
          Menu
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? activeLink : nonActiveLink)}
        >
          Orders
        </NavLink>
        <NavLink
          to="/order-history"
          className={({ isActive }) => (isActive ? activeLink : nonActiveLink)}
        >
          Order History
        </NavLink>
      </div>
    </div>
  );
}

export default AppBar;

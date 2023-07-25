import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/cryptocurrency.png"

function Navbar() {
  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "crypto",
    },
    {
      id: 3,
      link: "exchanges",
    },
    {
      id: 4,
      link: "news",
    },
  ];
  const [navicon, setNavicon] = useState("FaBars");
  const changeIcon = () => {
    if (navicon === "FaBars") setNavicon("Fatimes");
    else setNavicon("FaBars");
  };
  return (
    <div className="w-full h-20 text-white">
      <div className="flex items-center h-full w-full">
        <div className="ml-20">
          <p><img src={Logo} width={60} alt="" /></p>
        </div>
        <ul className="hidden md:flex ml-auto mr-10">
          {links.map(({ id, link }) => (
            <li
              className={`capitalize text-white hover:scale-110 duration-200 px-4 cursor-pointer font-medium h-full`}
              key={id}
            >
              <NavLink to={`/${link}`} className={({isActive})=>{
                return ` ${isActive ? 'bg-blue-500 text-white p-4' : ""}`
              }} >{link}</NavLink>
            </li>
          ))}
        </ul>
        <div className="cursor-pointer z-20 md:hidden ml-auto mr-8" onClick={changeIcon}>
          {navicon === "FaBars" ? <FaBars size={38} /> : <FaTimes size={38} />}
        </div>
        {navicon === "Fatimes" && (
          <ul className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col items-center justify-center z-10">
            {links.map(({ id, link }) => (
              <li
                key={id}
                className="cursor-pointer capitalize py-6 text-5xl hover:scale-110 duration-200 text-white"
              >
                <Link onClick={changeIcon} to={`/${link}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;

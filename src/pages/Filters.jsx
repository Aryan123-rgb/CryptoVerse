import React, { useContext, useState } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

function Filters() {
  let { setCurrency , setSortBy } = useContext(CryptoContext);
  const [currecyInput, setCurrecyInput] = useState("");

  const handleCurrenyInput = (e) => {
    e.preventDefault();
    setCurrency(currecyInput);
  };

  const handleSort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  }

  return (
    <div className="w-full h-12 border-2 border-gray-400 rounded-lg flex items-center justify-between relative">
      <Search />
      <div className="flex">
        <form className="relative flex items-center" onSubmit={handleCurrenyInput}>
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2 font-semibold"
          >
            Currency:
          </label>
          <input
            type="text"
            name="currency"
            placeholder="inr"
            className="w-16 rounded-lg pl-2 bg-[#f2f2f2] outline-0 border border-transparent py-1 focus:border-black leading-4"
            autoComplete="off"
            onChange={(e)=> setCurrecyInput(e.target.value)}
            value={currecyInput}
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img
              src={submitIcon}
              alt=""
              className="w-full h-auto"
              onClick={handleCurrenyInput}
            />
          </button>
        </form>
      </div>
      <div className="mr-2">
        <label htmlFor="" className="relative flex justify-center items-center">
          <span className="font-semibold mr-2">Sort by: </span>
          <select name="Sort by" id="" className="pl-2 pr-8 py-0.5 leading-3 capitalize outline-none" onClick={handleSort}>
            <option value="market_cap_desc">Market Cap</option>
            <option value="volume_desc">Volume</option>
            <option value="id_asc">id_asc</option>
            <option value="id_desc">id_desc</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Filters;

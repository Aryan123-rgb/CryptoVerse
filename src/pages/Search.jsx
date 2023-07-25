import React, { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  let { searchData,setCoinSearch } = useContext(CryptoContext);

  const selectCoin = (coin) => {
    setCoinSearch(coin)
    setSearchText("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  }

  return (
    <div>
      <form className="w-96 relative flex items-center ml-2">
        <input
          type="text"
          name="search"
          placeholder="Search for cryptocurrencies"
          className="w-full rounded-lg bg-[#f2f2f2] pl-2 outline-0 border-transparent required focus:border-black border py-1"
          onChange={handleChange}
          value={searchText}
          autoComplete="off"
        />
        <button className="absolute cursor-pointer right-1">
          <img src={searchIcon} className="w-full h-auto" alt="" />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className="absolute top-11 right-1 left-1 w-96 lg:w-80 h-96 rounded-lg overflow-x-hidden py-2 bg-zinc-300 bg-opacity-60 backdrop-blur-md overflow-y-scroll">
          {
            searchData ? searchData.map((coin)=>{
              return (
                <li key={coin.id} className="flex items-center ml-4 my-2 cursor-pointer" onClick={()=> selectCoin(coin.id)}>
                  <img src={coin.thumb} className="w-[1rem] h-[1rem] mx-1.5" />
                  <span>{coin.name}</span>
                </li>
              )
            }) : <div className="w-full h-full flex items-center justify-center">
                <div className="h-8 w-8 border-black border-4 border-b-zinc-300 rounded-full animate-spin"></div>
                <div className="ml-2">Searching...</div>
            </div>
          }
        </ul>
      ) : null}
    </div>
  );
};

function Search() {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (value) {
    getSearchResult(value);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
}

export default Search;

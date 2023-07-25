import { createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";

export const CryptoContext = createContext({});

export const CrpytoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [coinsearch, setCoinSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [sortBy, setSortBy] = useState("market_cap-desc");
  const [page, setPage] = useState(1);
  const [coinData, setCoinData] = useState();
  const [graphData,setGraphData] = useState();

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinsearch}&order=${sortBy}&per_page=20&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      )
        .then((response) => response.json())
        .then((json) => json);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((response) => response.json())
        .then((json) => json);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${query}`
      )
        .then((response) => response.json())
        .then((json) => json);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGraphData = async (id,currency,days) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      )
        .then((response) => response.json())
        .then((json) => json);
        setGraphData(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCryptoData();
  }, [coinsearch, currency, sortBy, page]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        setCoinSearch,
        searchData,
        getSearchResult,
        setCurrency,
        currency,
        setSortBy,
        page,
        setPage,
        getCoinData,
        coinData,
        graphData,
        getGraphData,
        setGraphData
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

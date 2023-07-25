import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { fetchFromAPI, options } from "../utils/fetchfromAPI";
import Cryptonavbar from "./Cryptonavbar"

function Cryptocurrencies({ simplified }) {
  const [coinStats, setCoinStats] = useState("");
  const getCoinStats = async () => {
    const coinArray = await fetchFromAPI(
      `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`,
      options
    );
    setCoinStats(coinArray);
  };
  getCoinStats();
  if (coinStats === "") return;
  let cryptos = coinStats.data.coins;
  const filteredCryptos = cryptos
    .filter((crypto) => simplified === true)
    .slice(0, 10);
  if (simplified === true) {
    cryptos = filteredCryptos;
  }
  return (
    <div>
      <div className="card-container">
          {/* <Cryptonavbar /> */}
        <div className="flex flex-wrap -mx-2">
          {cryptos.map((currency) => (
            <Link
              to={`/crypto/${currency.name.toLowerCase()}`}
              key={currency.uuid}
              className="w-full xs:w-1/2 sm:w-1/3  md:w-1/3 lg:w-1/5 xl:w-1/6 p-2"
            >
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden relative shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between px-4 py-3">
                  <h3 className="text-gray-800 text-lg font-semibold font-sans">
                    {currency.rank}. {currency.name}
                  </h3>
                  <img
                    src={currency.iconUrl}
                    alt="Currency Icon"
                    className="w-8 h-8 absolute top-2 right-2"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-2 font-sans">
                    Price: {millify(currency.price)}
                  </p>
                  <p className="text-gray-700 mb-2 font-sans">
                    Market Cap: {millify(currency.marketCap)}
                  </p>
                  <p className="text-gray-700 mb-2 font-sans">
                    Daily Exchange:{" "}
                    <span
                      className={
                        currency.change < 0
                          ? "text-red-500"
                          : currency.change > 0
                          ? "text-green-500"
                          : "text-gray-700"
                      }
                    >
                      {millify(currency.change)}%
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cryptocurrencies;

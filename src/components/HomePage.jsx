import React, { useState } from "react";
import { fetchFromAPI, options } from "../utils/fetchfromAPI";
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";

function HomePage() {
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
  return (
    <div>
      <div>
        <h1 className="md:text-6xl text-4xl my-6">Global Crypto Stats</h1>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 ">
        <div className="my-4">
          <p className="md:text-3xl text-xl opacity-30">
            Total Cryptocurrencies
          </p>
          <p className="md:text-2xl font-sans">
            {coinStats.data.stats.totalCoins.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="md:text-3xl text-xl opacity-30">Total Markets</p>
          <p className="md:text-2xl font-sans">
            {coinStats.data.stats.totalMarkets.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="md:text-3xl text-xl opacity-30">Total Exchanges</p>
          <p className="md:text-2xl font-sans">
            {coinStats.data.stats.totalExchanges.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="md:text-3xl text-xl opacity-30">Total Market Cap</p>
          <p className="md:text-2xl font-sans">
            {millify(coinStats.data.stats.totalMarketCap.toLocaleString())}
          </p>
        </div>
        <div>
          <p className="md:text-3xl text-xl opacity-30">Total 24h Volume</p>
          <p className="md:text-2xl font-sans">
            {millify(
              coinStats.data.stats.total24hVolume.toLocaleString("en-US")
            )}
          </p>
        </div>
      </div>
      <div className="flex justify-between mx-2 items-center mt-12">
        <p className="md:text-5xl text-4xl my-6">
          Top 10 Cryptocurrencies in the World
        </p>
        <Link to="/cryptocurrencies" className="md:text-2xl text-xl text-blue-600">Show More</Link>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="flex justify-between mx-2 items-center mt-12">
        <p className="md:text-5xl text-4xl my-6">
          Latest Crypto News
        </p>
        <Link to="/news" className="md:text-2xl text-xl text-blue-600">Show More</Link>
      </div>
    </div>
  );
}

export default HomePage;

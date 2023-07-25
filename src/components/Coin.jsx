import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Coin() {
  const { id } = useParams();
  let { getCoinData, coinData, currency, graphData, getGraphData } =
    useContext(CryptoContext);

  const [days, setDays] = useState(1);

  useEffect(() => {
    getCoinData(id.toLowerCase());
    getGraphData(id.toLowerCase(), currency, days);
  }, [id, currency, days]);

  if (!coinData || !graphData) return;

  console.log(graphData);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="w-full md:w-[30%] flex flex-col items-center mt-6 md:border-r-2 border-r-gray-900 border-r-0">
        <img
          src={coinData?.image.large}
          alt={coinData?.name}
          height="200"
          className="mb-6"
        />
        <h3 className="font-semibold font-mono mb-6 text-3xl">
          {coinData?.name}
        </h3>
        <p className="w-full pb-4 p-6 pt-0 text-center font-medium">
          {coinData?.description.en.split(". ")[0]}
        </p>
        <br />
        <p className="w-full pb-4 p-6 pt-0 text-center font-medium">
          {coinData?.description.en.split(". ")[(1, 2)]}
        </p>
        <div>
          <span className="flex text-2xl items-center">
            <p className="font-semibold font-sans">
              Rank:{" "}
              <span className="font-normal">{coinData?.market_cap_rank}</span>
            </p>
          </span>
          <span className="flex text-2xl items-center">
            <p className="font-semibold font-sans">
              Current Price:{" "}
              <span className="font-normal">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: currency,
                }).format(coinData?.market_data.current_price[currency])}
              </span>
            </p>
          </span>
          <span className="flex text-2xl items-center">
            <p className="font-semibold font-sans">
              Market Cap:{" "}
              <span className="font-normal">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: currency,
                }).format(coinData?.market_data.market_cap[currency])}
              </span>
            </p>
          </span>
        </div>
      </div>
      {/* chart */}
      <div className="w-full md:w-[75%] flex flex-col items-center justify-center mt-0 md:mt-7 p-5 pt-0 md:p-10">
        {graphData ? (
          <>
            <Line
              data={{
                labels: graphData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return date === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: graphData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days ) in ${currency.toUpperCase()}`,
                    borderColor: "rgb(59 130 246)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className="flex mt-5 w-full justify-around font-sans">
              <button className={`border-2 border-blue-500 rounded-lg py-3 px-5 cursor-pointer hover:bg-blue-500 hover:text-white w-[20%] ${days === 1 ? `bg-blue-500 text-white font-semibold` : ``}`} onClick={()=>setDays(1)} value={1}>
                24 Hours
              </button>
              <button className={`border-2 border-blue-500 rounded-lg py-3 px-5 cursor-pointer hover:bg-blue-500 hover:text-white w-[20%] ${days === 30 ? `bg-blue-500 text-white font-semibold` : ``}`} onClick={()=>setDays(30)} value={30}>
                30 Days
              </button>
              <button className={`border-2 border-blue-500 rounded-lg py-3 px-5 cursor-pointer hover:bg-blue-500 hover:text-white w-[20%] ${days === 90 ? `bg-blue-500 text-white font-semibold` : ``}`} onClick={()=>setDays(90)} value={90}>
                3 Months
              </button>
              <button className={`border-2 border-blue-500 rounded-lg py-3 px-5 cursor-pointer hover:bg-blue-500 hover:text-white w-[20%] ${days === 365 ? `bg-blue-500 text-white font-semibold` : ``}`} onClick={()=>setDays(365)} value={365}>
                1 Year
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Coin;

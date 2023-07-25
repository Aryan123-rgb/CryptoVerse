import React, { useContext } from "react";
import TableComponent from "../pages/TableComponent";
import Filters from "../pages/Filters";
import CryptoNavbar from "./Cryptonavbar";
import { CryptoContext } from "../context/CryptoContext";
import Cryptocurrencies from "./Cryptocurrencies";

function Crypto() {
  let { cryptoData } = useContext(CryptoContext);
  return (
    <section className="w-[80%] flex flex-col mb-24 relative mx-auto">
      {cryptoData  ?  (
        <>
          <CryptoNavbar />
          <Filters />
          <TableComponent />
        </>
      ) : (
        <Cryptocurrencies />
      )}
    </section>
  );
}

export default Crypto;

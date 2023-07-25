import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Coin from "./components/Coin";
import News from "./components/News";
import Crypto from "./components/Crypto";

import { CrpytoProvider } from "./context/CryptoContext";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <div
          style={{
            backgroundColor: "rgb(0,21,41)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Navbar />
        </div>
        <div className="p-5">
          <CrpytoProvider>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies simplified={false} />}
              />
              <Route path="/crypto/:id" element={<Coin />} />
              <Route
                path="/trending"
                element={<Crypto />}
              />
              <Route
                path="/saved"
                element={<Crypto />}
              />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </CrpytoProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

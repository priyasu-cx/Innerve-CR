import React from "react";
import BuyCoins from "./pages/BuyCoins.js";
import { UserAuthProvider } from "./context/UserAuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile.js";

import Home from "./components/Home.js";

const App = () => {
  return (
    <UserAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyCoins />} />
          <Route path="/id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserAuthProvider>
  );
};

export default App;

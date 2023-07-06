import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { CartProvider } from "./CartContext";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Body />

      <Footer />
    </CartProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

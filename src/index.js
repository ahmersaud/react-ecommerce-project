import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from './services/ErrorBoundary'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext";

ReactDOM.render(
<ErrorBoundary>
    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
         
    </BrowserRouter>
</ErrorBoundary>,
 document.getElementById("root"));

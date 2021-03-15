import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from './services/ErrorBoundary'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
<ErrorBoundary>
    <BrowserRouter>
         <App />
    </BrowserRouter>
</ErrorBoundary>,
 document.getElementById("root"));

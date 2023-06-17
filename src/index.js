import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./antd.css";
import { UserContextProvider } from "./contexts";
import Cookies from "universal-cookie";
import { BrowserRouter as Router } from "react-router-dom";
const cookies = new Cookies();
const DOMElement = document.getElementById("root");
const ReactRootElement = ReactDOM.createRoot(DOMElement);

ReactRootElement.render(
  <Router>
    <UserContextProvider token={cookies.get("accessToken")}>
      <App />
    </UserContextProvider>
  </Router>
);

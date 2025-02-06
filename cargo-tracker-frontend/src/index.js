import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; // Ensure you have a Redux store file
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>  {/* ✅ Wrap App with Provider */}
    <App />
  </Provider>
);

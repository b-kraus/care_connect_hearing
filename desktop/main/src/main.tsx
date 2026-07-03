import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./app/App";
// TypeScript may not have module declarations for CSS imports in this project setup.
// Silence the error for this side-effect import.
// @ts-ignore
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
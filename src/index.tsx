import React from "react";
import ReactDOM from "react-dom/client"; // Utilisez 'react-dom/client' au lieu de 'react-dom'
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./libs/context";
import { AnnounceProvider } from "./libs/announce_context";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <ContextProvider>
      <AnnounceProvider>
        <App />
      </AnnounceProvider>
    </ContextProvider>
);

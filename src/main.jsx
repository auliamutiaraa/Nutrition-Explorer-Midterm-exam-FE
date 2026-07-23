import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { NutritionProvider } from "./contexts/NutritionContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./styles.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NutritionProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NutritionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AxiosInterceptor } from "./services/makeRequest";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    {/* <AxiosInterceptor> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    {/* </AxiosInterceptor> */}
  </AuthContextProvider>
);

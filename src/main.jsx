import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import router from "../src/router.jsx"; 
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);

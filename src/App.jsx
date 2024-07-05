import React from "react";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatPage />
    </ThemeProvider>
  );
}

export default App;

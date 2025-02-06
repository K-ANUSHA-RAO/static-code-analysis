import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="flex h-screen">
      <ThemeProvider theme={theme}>
      <Navbar />
      <Dashboard />
      </ThemeProvider>
    </div>
  );
};

export default App;

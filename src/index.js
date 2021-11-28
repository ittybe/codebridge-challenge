import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import "./variables.css";

import App from './components/App';
import Book from "./components/Book";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./components/theme";
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="codebridge-challenge" element={<App />} />
            <Route path="codebridge-challenge/books/:isbn13" element={<Book />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
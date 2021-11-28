import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import "./variables.css";

import App from './components/App';
import Book from "./components/Book";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="codebridge-challenge" element={<App />} />
          <Route path="codebridge-challenge/books/:isbn13" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
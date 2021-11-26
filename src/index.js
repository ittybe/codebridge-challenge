import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import TestPost from "./components/TestPost";

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom"
const testposts = <div>No posts</div>

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="codebridge-challenge" element={<App />} />
        <Route path="codebridge-challenge/posts" element={testposts}/>
        <Route path="codebridge-challenge/posts/:postId" element={<TestPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBarComp from './components/AppBarComp';
import Details from './Pages/Details';
import Home from './Pages/Home';
import Popular from './Pages/Popular';
import TopRated from './Pages/TopRated';

import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppBarComp />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/detalhes/:id" element={<Details />} />
        <Route path="/toprated" element={<TopRated />} />
      </Routes>
      <CssBaseline />
    </BrowserRouter>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import PixPage from './pages/PixPage.jsx';
import CardPayment from './pages/CardPayment.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/pixpage" element={<PixPage />} />
        <Route path="/cardpayment" element={<CardPayment />} />
        <Route path="/" element={<App />}>
          {/* Rotas específicas dentro do componente App */}
          {/* <Route index element={<HomePage />} /> */}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  
  BrowserRouter as Router
 
} from "react-router-dom";
import ScrollToTop from './constant/ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Router>
     <ScrollToTop /> 
     <RecoilRoot>
      <App />
     </RecoilRoot>
     </Router>
  </React.StrictMode>
);

reportWebVitals();

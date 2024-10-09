import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ShopProvider } from './Context/ShopContext'; // ใช้ ShopProvider ที่ export แบบ named มาจาก ShopContext

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>
);


// ตัวอย่าง reportWebVitals ไม่เกี่ยวข้องกับปัญหานี้
reportWebVitals();

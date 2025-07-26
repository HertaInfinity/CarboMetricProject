import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1F2937',
          color: '#FFFFFF',
          border: '1px solid #10B981',
          borderRadius: '12px'
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF'
          }
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF'
          }
        }
      }}
    />
  </StrictMode>
);
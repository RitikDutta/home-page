// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Will use your Portfolio component soon
import './index.css' // Ensure Tailwind styles are imported
import { SpeedInsights } from "@vercel/speed-insights/react"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>,
)
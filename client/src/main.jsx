import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./store/AuthContext"
import { ChatProvider } from "./store/ChatContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChatProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChatProvider>
  </BrowserRouter>
)

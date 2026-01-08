import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' // used for diff page navigation we are using react-router , for user authentication going to use clerk
import {UserProvider} from './context/UserContext.jsx'


if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}


createRoot(document.getElementById('root')).render(
  <UserProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
 </UserProvider>
)

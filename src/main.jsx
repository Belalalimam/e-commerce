import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Store from './redux/store.jsx'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
      <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

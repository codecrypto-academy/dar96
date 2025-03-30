import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './components/Home'
import { Balance } from './components/Balance'
import { Tx } from './components/Tx'
import { Bloque } from './components/Bloque'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='balance/:address' element={<Balance />} />
          <Route path='tx/:tx' element={<Tx />} />
          <Route path='bloque/:bloque' element={<Bloque />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

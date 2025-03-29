import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider } from 'react-query'
import { Home } from './components/Home'
import { Cesta } from './components/Cesta'
import { Productos } from './components/Productos'
import { Producto } from './components/Producto'
import './index.css'

const queryClient = new QueryClient()
export const Context = createContext(null)

function App(){

  const [estado, setEstado] = useState({
    cesta: []
  })

  return (
    <Context.Provider value={{estado, setEstado}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}>
        <Route index element={<Productos/>} />
          <Route path='*' element={<Productos/>}  />
          <Route path='products' element={<Productos/>}/>
          <Route path='products/:id' element={<Producto/>}/>
          <Route path='cesta' element={<Cesta/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)

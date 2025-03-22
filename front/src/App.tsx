import { useState } from "react"
import { Button } from "./components/ui/button"
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from "./components/Dashboard"
import { Balance } from "./components/Balance"
import { Faucet } from "./components/Faucet"
import { Transaction } from "./components/Transaction"
import { createContext } from "react"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    children: [
      {path: 'balance', element: <Balance/>},
      {path: 'faucet', element: <Faucet/>},
      {path: 'transaction', element: <Transaction/>},
    ]
  }
])

export const UserContext = createContext('')

function App() {
  // const [tx, setTx] = useState<number | null>(null)
  // const handleSubmit = async () => {
  //   const res = await fetch('http://localhost:5556', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       jsonrpc: "2.0",
  //       method: "eth_getBalance",
  //       params: [
  //         "0x467221fb66EC2a4A5947B51325B8d06EF3f8363e",
  //         "latest"
  //       ],
  //       id: 1
  //     })
  //   })
  //   const data = await res.json()
  //   console.log(data)
  //   setTx((Number(data.result) / 10**18))
  // }

  

  const [account, setAccount] = useState();

  return (
    <UserContext.Provider value={{account, setAccount}} >
      <RouterProvider router={router}>
      
      </RouterProvider>
  
    </UserContext.Provider >
    
  )
}

export default App

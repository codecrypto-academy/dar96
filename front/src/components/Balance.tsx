import { UserContext } from "@/App"
import { useContext, useEffect, useState } from "react"
import { Button } from "./ui/button"


export function Balance() {
    const {account, setAccount} = useContext(UserContext)
    const [balance, setBalance] = useState('')
    const getBalance = async () => {
    const res = await fetch(`http://localhost:3333/api/balanceEthers/${account}`)
    const data = await res.json()
    setBalance(JSON.stringify(data))
    }
    return (
        <div>
            <Button variant={'default'} onClick={() => getBalance()}>Get Balance</Button><h1> {balance} </h1>
        </div>
    )
}
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import {UserContext} from '@/App'
import { useContext, useEffect } from "react";

export function Header() {
        const { account, setAccount } = useContext(UserContext)
    useEffect(()=>{
        const ethereum = (window as any).ethereum
        if(!ethereum) {
            return alert('Please install Metamask')
        }
        ethereum.request({
            method: 'eth_requestAccounts'
        }).then((acc:string[]) => {
            setAccount(acc[0])
        }).catch(console.error('Error en metamask'))

        ethereum.on('accountsChanged', (acc:string[]) => {
            setAccount(acc[0])
        })

    }, [account])
    
    return (
        <div className="flex justify-center gap-4 items-center mt-5 p-4">
            <Link to={'/balance'}><Button variant={"outline"}>Balance</Button></Link>
            <Link to={'/faucet'}><Button variant={"outline"}>Faucet</Button></Link>
            <Link to={'/transaction'}><Button variant={"outline"}>Transaction</Button></Link>
            <h1>Loggin on: {account} </h1>
        </div>
    )
}
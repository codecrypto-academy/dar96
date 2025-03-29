import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { ethers, toQuantity } from 'ethers'
import { Link } from "react-router-dom"

export function Cesta() {
    const {estado, setEstado} = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOk, setTxOk] = useState(null)
    const [txKo, setTxKo] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0)

    useEffect(()=> {
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on('accountsChanged', cuentas => {
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar(){
        const txParams = {
            to: '0x467221fb66EC2a4A5947B51325B8d06EF3f8363e',
            from: cuenta,
            value: toQuantity(ethers.parseEther(total.toString()))
        }

       try {
            const tx = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [txParams]
            })
            setTxOk(tx)
       } catch (error) {
            setTxKo(error)        
       }
    }

    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map(i => (
                    <tr key={i.producto.product_id}>
                        <td> <Link to={`/products/${i.producto.product_id}`}>{i.producto.product_id} </Link></td>
                        <td> {i.producto.product_name} </td>
                        <td> {i.producto.unit_price} </td>
                        <td> {i.cantidad} </td>
                        <td> {i.total} </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total {total} </h3>
        <h4> {cuenta} </h4>
        <button onClick={() => pagar()} className="btn btn-primary mt-3">Pagar</button>
        {txOk && <p className="alert alert-success"> {txOk} </p>}
        {txKo && <p> {txKo} </p>}
        </div>
}
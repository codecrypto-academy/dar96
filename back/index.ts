import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import {ethers} from 'ethers'
import dotenv from 'dotenv'
import fs from 'fs/promises'
const app = express()
const PORT = 3333

app.use(cors())
app.use(express.json())
dotenv.config()

app.get('/api/balance/:address', async (req: Request, res: Response) => {
    const { address } = req.params
    const response = await fetch(process.env.NODO_URL as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [
                address,
                "latest"
            ],
            id: 1
        })
    })
    const data = await response.json()
    res.json({
        balance: Number(data.result) / 10**18
    })
})

app.get('/api/balanceEthers/:address', async (req:Request, res: Response) => {
    const {address} = req.params
    const provider = new ethers.JsonRpcProvider(process.env.NODO_URL as string)
    const balance = await provider.getBalance(address)
    res.json({
        balance: ethers.formatEther(balance)
    })
})

app.get('/api/faucet/:address/:amount', async (req: Request, res: Response) => {
    const {address, amount} = req.params
    const provider = new ethers.JsonRpcProvider(process.env.NODO_URL as string)
    const ruta = process.env.KEYSTORE_PATH
    const rutaEth = await fs.readFile(ruta as string, 'utf-8')
    const wallet = await ethers.Wallet.fromEncryptedJson(rutaEth, process.env.KEYSTORE_PASSWORD as string)
    const connectedWallet = wallet.connect(provider)
    const t = await connectedWallet.sendTransaction({
        to: address,
        value: ethers.parseEther(amount)
    })
    const tx = await t.wait()
    res.json({
        from: tx?.from,
        to: tx?.to,
        hash: tx?.hash
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
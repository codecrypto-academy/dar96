const express = require('express')
const cors = require('cors')
const app = express()
const Web3 = require('web3')
require('dotenv').config()
app.use(cors())


const URL_INFURA=process.env.URL_INFURA
const web3 = new Web3(URL_INFURA)
app.get('/', async (req, res) => {
    const bloque = await web3.eth.getBlockNumber()
    res.send({bloque})
})

app.get('/bloque/:bloque', async (req, res) => {
    try {
        const bloque = await web3.eth.getBlock(req.params.bloque)
        res.send(bloque)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.get('/tx/:tx', async (req, res) => {
    try {
        const tx = await web3.eth.getTransaction(req.params.tx)
        res.send(tx)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.get('/balance/:address', async (req, res) => {
    try {
        const balance = await web3.eth.getBalance(req.params.address)
        res.send({balance, ethers: balance/1e18, ethers2: web3.utils.fromWei(balance, 'ether')})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.listen('3333', () => {
    console.log(`Server listening on http://localhost:3333`)
})
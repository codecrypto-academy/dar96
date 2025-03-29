const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()
const PORT = process.env.SERVER_PORT || 3000


app.use(cors())

app.get('/products', async (req, res) => {
    try {
        const query = await db.q('SELECT * FROM products', [])
        res.send(query)
    } catch (error) {
        res.send({error})
    }
})

app.get('/products/:id', async (req, res) => {

    try {
        const query = await db.q('SELECT * FROM products WHERE product_id=$1', [req.params.id])
        res.send(query)
    } catch (error) {
        res.send({error})
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
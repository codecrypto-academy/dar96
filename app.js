const Web3 = require('Web3')

const web3 = new Web3('http://localhost:8545')

async function getUltimoBloque() {
    const bloque = await web3.eth.getBlockNumber()
    return bloque
}

console.log(getUltimoBloque())
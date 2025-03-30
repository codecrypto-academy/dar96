export async function getBlock(bloque) {
    const response = await fetch(`http://localhost:3333/bloque/${bloque.queryKey[1]}`)
    const data = await response.json()
    return data
}

export async function getTx(tx) {
    const response = await fetch(`http://localhost:3333/tx/${tx.queryKey[1]}`)
    const data = await response.json()
    return data
}

export async function getBalance(balance) {
    const response = await fetch(`http://localhost:3333/balance/${balance.queryKey[1]}`)
    const data = await response.json()
    return data
}


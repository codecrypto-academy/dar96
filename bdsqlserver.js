const mssql = require('mssql')
const config = {
    user: 'sa',
    password: 'my-secret-pw',
    database: 'master',
    server: 'localhost',
    //Que como maximo va a abrir diez y nada mas arrancar va a abrir 0 conexiones
    pool: {
        min: 0,
        max: 10,
        //Si a los 30 segundos no se usa una conexión se pierde
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function q(sql) {
    try {
        await mssql.connect(config)
        const resultados = await mssql.query(sql)
        return resultados
    } catch (error) {
        return {error}
    }
}

q('SELECT * FROM customers').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})


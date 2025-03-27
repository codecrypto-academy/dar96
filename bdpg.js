const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'my-secret-pw',
    host: 'localhost',
    database: 'postgres',
    port: 5433
})

function q(sql, params) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if(err) reject(err)
            client.query(sql, params, (err, res) => {
                done()
                if(err){
                    rej(err)
                }else {
                    resolve(res.rows)
                }

            })
        })
    })
}

q('SELECT * FROM Customers limit 3', []).then(d => {
    console.log(d)
}).catch(err => {
    console.log(err)
})
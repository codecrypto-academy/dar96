const mysql = require('mysql8')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'northwind',
    //no es necesario poner el puerto porque estoy usando el puerto por defecto que es el 3306
    password: 'my-secret-pw'
}) 

function q(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function(error, results, fields){
            if(error) reject(error)
            return resolve(results)
        })
    })
}

q('SELECT * FROM Customers limit 3').then(d => {
    console.log(d)
}).catch(err => {
    console.log(err)
})
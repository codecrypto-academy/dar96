const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'postgres',
    user: 'postgres',
    password: 'my-secret-pw'
})

const q = async (sql, params) => {
    try {
        await pool.connect()
    } catch (error) {
        console.log(error)
    }

    try {
        const query = await pool.query(sql, params)
        return query.rows
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    q
}
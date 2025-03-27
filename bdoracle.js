const oracledb = require('oracledb');
var pool = null
try {
    oracledb.initOracleClient({ libDir: 'C:\\Users\\Dariel\\Downloads\\instantclient-basiclite-windows.x64-21.3.0.0.0\\instantclient_21_3' });
} catch (err) {
    console.error(err);
}

async function getPool(con) {
    return new Promise(async (resolve, reject) => {
        if (pool) resolve(pool)
        try {
            console.log("obtengo pool")
            pool = await oracledb.createPool(con)
            resolve(pool)
        } catch (error) {
            reject(error)
        }
    });
}

async function q(sql, parametros) {
    let connection;
    try {
        await getPool({
            user: 'C##DATOS', password: 'datos',
            connectString: 'localhost:1521/XE', poolAlias: "curso"
        })
        connection = await oracledb.getConnection("curso");
        const result = await connection.execute(
            sql,
            parametros, 
            { outFormat: oracledb.OUT_FORMAT_ARRAY },
        );
        return (result.rows);
    } catch (err) {
        return err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return err;
            }
        }
    }
}

q('SELECT * FROM customers', []).then(d => {
    console.log(d)
}).catch(err => {
    console.log(err)
})
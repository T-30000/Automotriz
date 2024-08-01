const mysql = require('mysql2');

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    password: 'zeGHyxYijBAjZqbDszWKXRAfUZikJBeY',
    database: 'railway',
    port: 59788, // Usa el puerto correcto
    waitForConnections: true,
    connectionLimit: 10, // Ajusta según la carga esperada
    queueLimit: 0 // Sin límite de cola
});

// Promisify pool.query para usar async/await
const promisePool = pool.promise();

// Ejemplo de cómo manejar errores de conexión
promisePool.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos exitosa!');
        connection.release();
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err.message);
    });

module.exports = promisePool;

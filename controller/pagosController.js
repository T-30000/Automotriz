const db = require('./dbController');  // Asegúrate de tener configurada tu conexión a la base de datos

// Manejar la transacción para registrar una venta
const handleRegistrarVenta = async (req, res) => {
    const { numero_serie, id_cliente, tipo_pago_id, monto } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarVenta(?, ?, ?, ?)', [
            numero_serie, id_cliente, tipo_pago_id, monto
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Venta registrada correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar venta:', error);
        res.status(500).json({ error: 'Error interno al registrar venta.' });
    } finally {
        connection.release();
    }
};

module.exports = {
    handleRegistrarVenta
};

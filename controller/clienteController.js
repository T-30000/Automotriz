const db = require('./dbController'); // Asegúrate de tener configurada tu conexión a la base de datos

// Manejar la transacción para activar un cliente
const handleActivarCliente = async (req, res) => {
    const { cliente_id } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL ActivarCliente(?)', [cliente_id]);

        await connection.commit();
        res.status(200).json({ message: 'Cliente activado correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al activar cliente:', error);
        res.status(500).json({ error: 'Error interno al activar cliente.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para dar de baja a un cliente
const handleDarDeBajaCliente = async (req, res) => {
    const { cliente_id } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL DarDeBajaCliente(?)', [cliente_id]);

        await connection.commit();
        res.status(200).json({ message: 'Cliente dado de baja correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al dar de baja cliente:', error);
        res.status(500).json({ error: 'Error interno al dar de baja cliente.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para registrar un nuevo cliente
const handleRegistrarNuevoCliente = async (req, res) => {
    const {
        nombre, apellido, telefono, email, direccion, identificacion,
        contrasena, estado
    } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarNuevoCliente(?, ?, ?, ?, ?, ?, ?, ?)', [
            nombre, apellido, telefono, email, direccion, identificacion,
            contrasena, estado
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Nuevo cliente registrado correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar nuevo cliente:', error);
        res.status(500).json({ error: 'Error interno al registrar nuevo cliente.' });
    } finally {
        connection.release();
    }
};

module.exports = {
    handleActivarCliente,
    handleDarDeBajaCliente,
    handleRegistrarNuevoCliente
};

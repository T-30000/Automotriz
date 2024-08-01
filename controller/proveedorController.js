const db = require('./dbController'); // Asegúrate de tener configurada tu conexión a la base de datos

// Manejar la transacción para registrar un proveedor de automóviles
const handleRegistrarProveedorAutomoviles = async (req, res) => {
    const {
        nombre, telefono, email, direccion, tipo_proveedor,
        condiciones, automoviles_prov_id
    } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarProveedorAutomoviles(?, ?, ?, ?, ?, ?, ?)', [
            nombre, telefono, email, direccion, tipo_proveedor,
            condiciones, automoviles_prov_id
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Proveedor de automóviles registrado correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar proveedor de automóviles:', error);
        res.status(500).json({ error: 'Error interno al registrar proveedor de automóviles.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para actualizar la información del proveedor
const handleActualizarInformacionProveedor = async (req, res) => {
    const {
        proveedor_id, nombre, telefono, email, direccion,
        tipo_proveedor, condiciones
    } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL ActualizarInformacionProveedor(?, ?, ?, ?, ?, ?, ?)', [
            proveedor_id, nombre, telefono, email, direccion,
            tipo_proveedor, condiciones
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Información del proveedor actualizada correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar información del proveedor:', error);
        res.status(500).json({ error: 'Error interno al actualizar información del proveedor.' });
    } finally {
        connection.release();
    }
};

module.exports = {
    handleRegistrarProveedorAutomoviles,
    handleActualizarInformacionProveedor,
};

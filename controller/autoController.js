const db = require('./dbController'); // Asegúrate de tener configurada tu conexión a la base de datos

// Manejar la transacción para registrar un nuevo automóvil
const handleRegistrarNuevoAutomovil = async (req, res) => {
    const { numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL registrarautomovil(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Automóvil registrado exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el automóvil' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para actualizar el inventario de automóviles
const handleActualizarInventarioAutomoviles = async (req, res) => {
    const { numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL actualizarinventarioautomoviles(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Inventario de automóviles actualizado exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el inventario de automóviles' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para registrar un proveedor de automóviles
const handleRegistrarProveedorAutomoviles = async (req, res) => {
    const { id_proveedor, nombre, contacto, direccion, telefono } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL registrarproveedorautomoviles(?, ?, ?, ?, ?)', [
            id_proveedor, nombre, contacto, direccion, telefono
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Proveedor de automóviles registrado exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el proveedor de automóviles' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para eliminar un automóvil
const handleEliminarAutomovil = async (req, res) => {
    const { numero_serie } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL eliminarautomovil(?)', [numero_serie]);

        await connection.commit();
        res.status(200).json({ message: 'Automóvil eliminado exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el automóvil' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para actualizar la información de un automóvil
const handleActualizarInformacionAutomovil = async (req, res) => {
    const { numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query('CALL actualizarinformacionautomovil(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            numero_serie, tipo_auto, marca, modelo, anio, cilindros, disponibilidad, precio, puertas, color, seguro_id, servicio, garantia, costo, descuento, costo_venta, estado, imagen_url
        ]);

        await connection.commit();
        res.status(200).json({ message: 'Información del automóvil actualizada exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la información del automóvil' });
    } finally {
        connection.release();
    }
};

module.exports = {
    handleRegistrarNuevoAutomovil,
    handleActualizarInventarioAutomoviles,
    handleRegistrarProveedorAutomoviles,
    handleEliminarAutomovil,
    handleActualizarInformacionAutomovil
};

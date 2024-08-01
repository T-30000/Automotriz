// db/empleadoController.js

const promisePool = require('./dbController'); // Importa promisePool desde tu dbController.js

// Manejar la transacción para registrar un nuevo empleado
const handleRegistrarNuevoEmpleado = async (req, res) => {
    const {
        nombre, apellido, telefono, email, direccion, numero_seguro,
        sueldo_base, prestacion, contrasena, imagen_url
    } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarNuevoEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            nombre, apellido, telefono, email, direccion, numero_seguro,
            sueldo_base, prestacion, contrasena, imagen_url
        ]);

        await connection.commit();
        console.error({ message: 'Nuevo empleado registrado correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar nuevo empleado:', error);
        res.status(500).json({ error: 'Error interno al registrar nuevo empleado.' });
    } finally {
        connection.release();
    }
};
const handleRegistrarPosicionEmpleado = async (req, res) => {
    const {
        id_empleado, puesto, fecha_contrato, estado, descuentos,
        comision, prestamo, capacitacion, sueldo_base
    } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarPosicionEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            id_empleado, puesto, fecha_contrato, estado, descuentos,
            comision, prestamo, capacitacion, sueldo_base
        ]);

        await connection.commit();
        console.error({ message: 'Posición del empleado registrada correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar la posición del empleado:', error);
        res.status(500).json({ error: 'Error interno al registrar la posición del empleado.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para aprobar la contratación de un empleado
const handleAprobarContratacionEmpleado = async (req, res) => {
    const { empleado_id } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL AprobarContratacionEmpleado(?)', [empleado_id]);

        await connection.commit();
        console.error({ message: 'Contratación de empleado aprobada correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al aprobar contratación de empleado:', error);
        res.status(500).json({ error: 'Error interno al aprobar contratación de empleado.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para registrar la renuncia de un empleado
const handleRegistrarRenunciaEmpleado = async (req, res) => {
    const { empleado_id } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL RegistrarRenunciaEmpleado(?)', [empleado_id]);

        await connection.commit();
        console.error({ message: 'Renuncia de empleado registrada correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar renuncia de empleado:', error);
        res.status(500).json({ error: 'Error interno al registrar renuncia de empleado.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para despedir un empleado
const handleDespedirEmpleado = async (req, res) => {
    const { empleado_id } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL DespedirEmpleado(?)', [empleado_id]);

        await connection.commit();
        console.error({ message: 'Empleado despedido correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al despedir empleado:', error);
        res.status(500).json({ error: 'Error interno al despedir empleado.' });
    } finally {
        connection.release();
    }
};

// Manejar la transacción para descartar un empleado
const handleDescartarEmpleado = async (req, res) => {
    const { empleado_id } = req.body;

    const connection = await promisePool.getConnection(); // Obtiene una conexión del pool

    try {
        await connection.beginTransaction();

        await connection.query('CALL DescartarEmpleado(?)', [empleado_id]);

        await connection.commit();
        console.error({ message: 'Empleado descartado correctamente.' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al descartar empleado:', error);
        res.status(500).json({ error: 'Error interno al descartar empleado.' });
    } finally {
        connection.release();
    }
};

module.exports = {
    handleRegistrarNuevoEmpleado,
    handleAprobarContratacionEmpleado,
    handleRegistrarRenunciaEmpleado,
    handleDespedirEmpleado,
    handleDescartarEmpleado,
    handleRegistrarPosicionEmpleado
};

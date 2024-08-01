// controller/empleadoController.js
const promisePool = require('./dbController'); // Asegúrate de que esta ruta es correcta

const loginEmpleado = async (req, res) => {
    const { correo, contrasena } = req.body;

    // Validar que los datos de entrada no estén vacíos
    if (!correo || !contrasena) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
    }

    const sql = `CALL ValidarCredencialEmpleado(?, ?)`;

    try {
        const [results] = await promisePool.query(sql, [correo, contrasena]);

        const result = results[0]; // El resultado de la consulta
        if (result && result.id_empleado) {
            // Almacenar las variables en la sesión
            req.session.numeroUser = result.id_empleado;
            req.session.puestoUser = result.puesto;
            req.session.estadoUser = result.estado;

            console.log('Credencial verificada correctamente:', result);
            res.status(200).json({
                message: 'Credencial verificada correctamente.',
                id: result.id_empleado,
                puesto: result.puesto,
                estado: result.estado
            });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas.' });
        }
    } catch (err) {
        console.error('Error al verificar credenciales:', err);
        res.status(500).json({ error: 'Error interno al verificar credenciales.' });
    }
};

module.exports = {
    loginEmpleado,
};

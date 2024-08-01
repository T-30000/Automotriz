// db/consultasController.js

const promisePool = require('./dbController'); // Asegúrate de importar promisePool correctamente

const getEmpleadosVentas = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Vista_EmpleadosVentas");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Vista_EmpleadosVentas:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getAutosDisponibles = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Vista_AutosDisponibles");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Vista_AutosDisponibles:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getClientesActivos = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Vista_ClientesActivos");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Vista_ClientesActivos:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getVentasPorMes = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Vista_VentasPorMes");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Vista_VentasPorMes:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getContratos = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Vista_Contratos");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Vista_Contratos:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getEmpleadosPorZona = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Empleados_Por_Zona");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Empleados_Por_Zona:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getEmpleadosOrdenadosPorSueldo = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Empleados_Ordenados_Por_Sueldo");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Empleados_Ordenados_Por_Sueldo:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getEmpleadosRenunciados = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Empleados_Renunciados");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Empleados_Renunciados:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};
const getEmpleadosActivos = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Empleados_Activos");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Empleados_Renunciados:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};
const getEmpleadosDespedidos = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Empleados_Despedidos");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Empleados_Despedidos:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getEmpleadosPendientesContratacion = async (req, res) => {
    try {
        const [results] = await promisePool.query('SELECT * FROM Empleados_Pendientes_Contratacion');
        res.json(results);
    } catch (error) {
        console.error('Error al obtener empleados pendientes de contratación:', error);
        res.status(500).json({ error: 'Error interno al obtener empleados pendientes de contratación.' });
    }
};

const getAutosVendidosConServicio = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Autos_Vendidos_Con_Servicio");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Autos_Vendidos_Con_Servicio:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getAutosPorZona = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM Autos_Por_Zona");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar Autos_Por_Zona:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getHistorialClientes = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM HistorialClientes");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar HistorialClientes:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getHistorialEmpleados = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM HistorialEmpleados");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar HistorialEmpleados:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

const getHistorialAutos = async (req, res) => {
    try {
        const [results] = await promisePool.query("SELECT * FROM HistorialAutos");
        res.json(results);
    } catch (error) {
        console.error('Error al consultar HistorialAutos:', error);
        res.status(500).send("Error al consultar la base de datos");
    }
};

module.exports = {
    getEmpleadosVentas,
    getAutosDisponibles,
    getClientesActivos,
    getVentasPorMes,
    getContratos,
    getEmpleadosPorZona,
    getEmpleadosOrdenadosPorSueldo,
    getEmpleadosRenunciados,
    getEmpleadosActivos,
    getEmpleadosDespedidos,
    getEmpleadosPendientesContratacion,
    getAutosVendidosConServicio,
    getAutosPorZona,
    getHistorialClientes,
    getHistorialEmpleados,
    getHistorialAutos
};

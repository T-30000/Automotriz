const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const router = require('./routes.js'); // Tu enrutador personalizado

const autoController = require('./controller/autoController.js'); // Actualiza la ruta aquí
const clienteController = require('./controller/clienteController'); // Actualiza la ruta aquí
const consultasController = require('./controller/consultasController'); // Actualiza la ruta aquí
const empleadoController = require('./controller/empleadoController'); // Actualiza la ruta aquí
const formulariosController = require('./controller/formulariosController'); // Actualiza la ruta aquí
const pagosController = require('./controller/pagosController'); // Actualiza la ruta aquí
const proveedorController = require('./controller/proveedorController'); // Actualiza la ruta aquí

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Sirve archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'html', 'Otras_vistas')));
app.use(express.static(path.join(__dirname, 'public', 'html', 'Vistas_empleado')));
app.use(express.static(path.join(__dirname, 'public', 'html', 'forms')));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta por defecto para abrir inicio_sesion.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/Otras_vistas/inicio_sesion.html'));
});

// Usa tu enrutador personalizado para otras rutas
app.use('/', router);

// Rutas para autos
app.post('/registrar-nuevo-automovil', autoController.handleRegistrarNuevoAutomovil);
app.put('/actualizar-inventario-automoviles', autoController.handleActualizarInventarioAutomoviles);
app.put('/actualizar-informacion-automovil', autoController.handleActualizarInformacionAutomovil);
app.delete('/eliminar-automovil', autoController.handleEliminarAutomovil);

// Rutas para clientes
app.post('/activar-cliente', clienteController.handleActivarCliente);
app.post('/dar-de-baja-cliente', clienteController.handleDarDeBajaCliente);
app.post('/registrar-nuevo-cliente', clienteController.handleRegistrarNuevoCliente);

// Rutas para consultas
app.get('/empleados-ventas', consultasController.getEmpleadosVentas);
app.get('/autos-disponibles', consultasController.getAutosDisponibles);
app.get('/clientes-activos', consultasController.getClientesActivos);
app.get('/ventas-por-mes', consultasController.getVentasPorMes);
app.get('/contratos', consultasController.getContratos);
app.get('/empleados-por-zona', consultasController.getEmpleadosPorZona);
app.get('/empleados-ordenados-por-sueldo', consultasController.getEmpleadosOrdenadosPorSueldo);
app.get('/empleados-renunciados', consultasController.getEmpleadosRenunciados);
app.get("/empleados-activos", consultasController.getEmpleadosActivos);
app.get('/empleados-despedidos', consultasController.getEmpleadosDespedidos);
app.get('/empleados-pendientes-contratacion', consultasController.getEmpleadosPendientesContratacion);
app.get('/autos-vendidos-con-servicio', consultasController.getAutosVendidosConServicio);
app.get('/autos-por-zona', consultasController.getAutosPorZona);
app.get('/historial-clientes', consultasController.getHistorialClientes);
app.get('/historial-empleados', consultasController.getHistorialEmpleados);
app.get('/historial-autos', consultasController.getHistorialAutos);

// Rutas para empleados
app.post('/registrar-nuevo-empleado', empleadoController.handleRegistrarNuevoEmpleado);
app.put('/aprobar-contratacion-empleado', empleadoController.handleAprobarContratacionEmpleado);
app.put('/registrar-posicion-empleado', empleadoController.handleRegistrarPosicionEmpleado);
app.put('/aprobar-contratacion-empleado', empleadoController.handleAprobarContratacionEmpleado);
app.delete('/descartar-empleado', empleadoController.handleDescartarEmpleado);
app.put('/registrar-renuncia-empleado', empleadoController.handleRegistrarRenunciaEmpleado);
app.put('/despedir-empleado', empleadoController.handleDespedirEmpleado);

// Rutas para formularios
app.get('/Login-Empleado', formulariosController.loginEmpleado);

// Rutas para pagos
app.post('/registrar-venta', pagosController.handleRegistrarVenta);

// Rutas para proveedores
app.post('/registrar-proveedor-automoviles', proveedorController.handleRegistrarProveedorAutomoviles);
app.put('/actualizar-informacion-proveedor', proveedorController.handleActualizarInformacionProveedor);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_clientes_correo ON Clientes (correo);
CREATE INDEX idx_clientes_contrasena ON Clientes (contrasena);
CREATE INDEX idx_empleados_correo ON Empleados (correo);
CREATE INDEX idx_empleados_contrasena ON Empleados (contrasena);
CREATE INDEX idx_credenciales_correo ON Credenciales (correo);


-- Vista de Empleados y Ventas
CREATE VIEW Vista_EmpleadosVentas AS
SELECT 
    e.id_empleado,
    e.nombre,
    e.apellido,
    e.puesto,
    e.sueldo_base,
    e.estado AS estado_empleado,
    SUM(v.monto_venta) AS total_ventas
FROM Empleados e
LEFT JOIN Ventas v ON e.id_empleado = v.id_empleado
GROUP BY e.id_empleado, e.nombre, e.apellido, e.puesto, e.sueldo_base, e.estado;

-- Vista de Autos Disponibles
CREATE VIEW Vista_AutosDisponibles AS
SELECT 
    a.id_auto,
    a.marca,
    a.modelo,
    a.anio,
    a.precio,
    a.stock_disponible,
    a.estado AS estado_auto
FROM Autos a
LEFT JOIN Ventas v ON a.id_auto = v.id_auto
WHERE v.id_venta IS NULL;  -- Excluye autos vendidos

-- Vista de Clientes Activos
CREATE VIEW Vista_ClientesActivos AS
SELECT 
    c.id_cliente,
    c.nombre,
    c.apellido,
    c.telefono,
    c.email,
    c.estado AS estado_cliente,
    COUNT(v.id_auto) AS autos_comprados
FROM Clientes c
LEFT JOIN Ventas v ON c.id_cliente = v.id_cliente
WHERE c.estado = 'activo'
GROUP BY c.id_cliente, c.nombre, c.apellido, c.telefono, c.email, c.estado;


-- Vista de Ventas por Mes
CREATE VIEW Vista_VentasPorMes AS
SELECT 
    MONTH(v.fecha_venta) AS mes,
    YEAR(v.fecha_venta) AS anio,
    COUNT(v.id_venta) AS cantidad_ventas,
    SUM(v.monto_venta) AS total_ventas
FROM Ventas v
GROUP BY MONTH(v.fecha_venta), YEAR(v.fecha_venta)
ORDER BY anio DESC, mes DESC;

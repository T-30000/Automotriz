CREATE TABLE IF NOT EXISTS LogActividades (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tabla_afectada VARCHAR(100),
    tipo_operacion VARCHAR(20),
    detalle_operacion TEXT
);

DELIMITER $$
CREATE TRIGGER trg_LogActividades AFTER INSERT ON Empleados
FOR EACH ROW
BEGIN
    INSERT INTO LogActividades (tabla_afectada, tipo_operacion, detalle_operacion)
    VALUES ('Empleados', 'INSERT', CONCAT('Nuevo empleado registrado: ', NEW.nombre, ' ', NEW.apellido));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_LogActividades AFTER Update ON Empleados
FOR EACH ROW
BEGIN
    INSERT INTO LogActividades (tabla_afectada, tipo_operacion, detalle_operacion)
    VALUES ('Empleados', 'Update', CONCAT('Empleado fue actualizado por: ', NEW.nombre, ' ', NEW.apellido));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER trg_LogActividades AFTER INSERT ON Clientes
FOR EACH ROW
BEGIN
    INSERT INTO LogActividades (tabla_afectada, tipo_operacion, detalle_operacion)
    VALUES ('Clientes', 'INSERT', CONCAT('Nuevo cliente registrado: ', NEW.nombre, ' ', NEW.apellido));
END$$
DELIMITER ;

--- Este trigger actualiza automáticamente la cantidad disponible de autos cuando se realiza una venta.
DELIMITER $$
CREATE TRIGGER trg_ControlStockAutos
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
    UPDATE Autos
    SET stock_disponible = stock_disponible - NEW.cantidad_vendida
    WHERE id_auto = NEW.id_auto;
END$$
DELIMITER ;

-- Este trigger valida que los datos ingresados cumplan con ciertas reglas antes de permitir la inserción.
DELIMITER $$
CREATE TRIGGER trg_ValidarDatosCliente
BEFORE INSERT ON Clientes
FOR EACH ROW
BEGIN
    IF NEW.estado NOT IN ('Nuevo', 'activo', 'baja') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El estado del cliente debe ser Nuevo, activo o baja.';
    END IF;
END$$
DELIMITER ;

-- Este trigger calcula automáticamente la comisión de un empleado cuando se registra una nueva venta.
DELIMITER $$
CREATE TRIGGER trg_CalcularComision
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
    UPDATE Empleados
    SET comision_total = comision_total + NEW.comision
    WHERE id_empleado = NEW.id_empleado;
END$$
DELIMITER ;

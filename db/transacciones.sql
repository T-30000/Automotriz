    -- Crear función para encriptar utilizando AES
    DELIMITER $$

    CREATE FUNCTION AES_ENCRYPT_STRING(input_string TEXT, secret_key TEXT) RETURNS TEXT DETERMINISTIC
    BEGIN
        DECLARE encrypted_string TEXT;
        SET encrypted_string = HEX(AES_ENCRYPT(input_string, secret_key));
        RETURN encrypted_string;
    END$$

    -- Crear función para desencriptar utilizando AES
    CREATE FUNCTION AES_DECRYPT_STRING(encrypted_string TEXT, secret_key TEXT) RETURNS TEXT DETERMINISTIC
    BEGIN
        DECLARE decrypted_string TEXT;
        SET decrypted_string = AES_DECRYPT(UNHEX(encrypted_string), secret_key);
        RETURN decrypted_string;
    END$$

    DELIMITER ;


-- Procedimiento para registrar una nueva credencial
DELIMITER //

CREATE PROCEDURE RegistrarCredencial(
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(100)
)
BEGIN
    START TRANSACTION;
    
    INSERT INTO Credenciales (correo, contrasena)
    VALUES (p_correo, p_contrasena);
    
    COMMIT;
END//

DELIMITER ;


-- Transacción para registrar la venta de un automóvil
DELIMITER //

CREATE PROCEDURE RegistrarVenta(
    IN p_numero_serie VARCHAR(50),
    IN p_id_cliente INT,
    IN p_tipo_pago_id INT,
    IN p_monto DECIMAL(10, 2)
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Marcar el automóvil como vendido
    UPDATE Autos
    SET disponibilidad = FALSE
    WHERE numero_serie = p_numero_serie;
    
    -- Registrar el pago
    INSERT INTO Pagos (id_cliente, tipo_pago_id, monto)
    VALUES (p_id_cliente, p_tipo_pago_id, p_monto);
    
    COMMIT;
END//

DELIMITER ;


-- Transacción para actualizar la información de un automóvil
DELIMITER //

CREATE PROCEDURE ActualizarInformacionAutomovil(
    IN p_numero_serie VARCHAR(50),
    IN p_marca VARCHAR(50),
    IN p_modelo VARCHAR(50),
    IN p_anio YEAR,
    IN p_cilindros INT,
    IN p_precio DECIMAL(10, 2),
    IN p_puertas INT,
    IN p_color VARCHAR(20),
    IN p_seguro_id INT,
    IN p_servicio DECIMAL(10, 2),
    IN p_garantia DECIMAL(10, 2),
    IN p_costo DECIMAL(10, 2),
    IN p_descuento DECIMAL(10, 2),
    IN p_costo_venta DECIMAL(10, 2)
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar la información del automóvil
    UPDATE Autos
    SET marca = p_marca,
        modelo = p_modelo,
        anio = p_anio,
        cilindros = p_cilindros,
        precio = p_precio,
        puertas = p_puertas,
        color = p_color,
        seguro_id = p_seguro_id,
        servicio = p_servicio,
        garantia = p_garantia,
        costo = p_costo,
        descuento = p_descuento,
        costo_venta = p_costo_venta
    WHERE numero_serie = p_numero_serie;
    
    COMMIT;
END//

DELIMITER ;

-- Transacción para registrar un cambio en el historial de cambios
DELIMITER //

CREATE PROCEDURE RegistrarCambioHistorial(
    IN p_tabla_afectada VARCHAR(50),
    IN p_operacion VARCHAR(10),
    IN p_registro_id VARCHAR(50),
    IN p_campo_afectado VARCHAR(50),
    IN p_valor_anterior TEXT,
    IN p_valor_nuevo TEXT,
    IN p_empleado_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Registrar el cambio en el historial
    INSERT INTO Historial_Cambios (tabla_afectada, operacion, registro_id, campo_afectado, valor_anterior, valor_nuevo, empleado_id)
    VALUES (p_tabla_afectada, p_operacion, p_registro_id, p_campo_afectado, p_valor_anterior, p_valor_nuevo, p_empleado_id);
    
    COMMIT;
END//

DELIMITER ;


-- Transacción para eliminar un automóvil
DELIMITER //

CREATE PROCEDURE EliminarAutomovil(
    IN p_numero_serie VARCHAR(50)
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Mover el automóvil a la tabla de autos eliminados
    INSERT INTO Autos_Eliminados (numero_serie, marca, modelo, cilindros, anio)
    SELECT numero_serie, marca, modelo, cilindros, anio
    FROM Autos
    WHERE numero_serie = p_numero_serie;
    
    -- Eliminar el automóvil de la tabla de autos
    DELETE FROM Autos
    WHERE numero_serie = p_numero_serie;
    
    COMMIT;
END//

DELIMITER ;
-- Transacción para registrar un nuevo empleado
DELIMITER //



DELIMITER ;

-- Transacción para aprobar la contratación de un empleado
DELIMITER //

CREATE PROCEDURE AprobarContratacionEmpleado(
    IN p_empleado_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el estado del empleado a "Empleado"
    UPDATE Empleados
    SET estado = 'Empleado'
    WHERE empleado_id = p_empleado_id;
    
    COMMIT;
END//

DELIMITER ;

-- Transacción para registrar la renuncia de un empleado
DELIMITER //

CREATE PROCEDURE RegistrarRenunciaEmpleado(
    IN p_empleado_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el estado del empleado a "Renuncia"
    UPDATE Empleados
    SET estado = 'Renuncia'
    WHERE empleado_id = p_empleado_id;
    
    COMMIT;
END//

DELIMITER ;
-- Transacción para despedir a un empleado
DELIMITER //

CREATE PROCEDURE DespedirEmpleado(
    IN p_empleado_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el estado del empleado a "Despido"
    UPDATE Empleados
    SET estado = 'Despido'
    WHERE empleado_id = p_empleado_id;
    
    COMMIT;
END//

DELIMITER ;

-- Transacción para activar un cliente (cuando compra un automóvil)
DELIMITER //

CREATE PROCEDURE ActivarCliente(
    IN p_cliente_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el estado del cliente a "Activo"
    UPDATE Clientes
    SET estado = 'Activo'
    WHERE cliente_id = p_cliente_id;
    
    COMMIT;
END//

DELIMITER ;
-- Transacción para dar de baja a un cliente
DELIMITER //

CREATE PROCEDURE DarDeBajaCliente(
    IN p_cliente_id INT
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Actualizar el estado del cliente a "Baja"
    UPDATE Clientes
    SET estado = 'Baja'
    WHERE cliente_id = p_cliente_id;
    
    COMMIT;
END//

DELIMITER ;




DELIMITER //

-- Procedimiento para registrar un nuevo empleado
CREATE PROCEDURE RegistrarNuevoEmpleado(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT,
    IN p_fecha_contrato DATE,
    IN p_numero_seguro VARCHAR(50),
    IN p_puesto VARCHAR(50),
    IN p_sueldo_base DECIMAL(10, 2),
    IN p_descuentos DECIMAL(10, 2),
    IN p_comision DECIMAL(10, 2),
    IN p_prestacion DECIMAL(10, 2),
    IN p_capacitacion VARCHAR(100),
    IN p_prestamo DECIMAL(10, 2),
    IN p_contrasena VARCHAR(100),
    IN p_estado VARCHAR(20)  -- Estado inicial: Solicitado
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Encriptar la contraseña utilizando AES
    SET @encrypted_password = AES_ENCRYPT_STRING(p_contrasena, 'my_secret_key');

    -- Insertar el nuevo empleado con estado inicial
    INSERT INTO Empleados (nombre, apellido, telefono, email, direccion, fecha_contrato, numero_seguro, puesto, sueldo_base, descuentos, comision, prestacion, capacitacion, prestamo, contrasena_encrypted, estado)
    VALUES (p_nombre, p_apellido, p_telefono, p_email, p_direccion, p_fecha_contrato, p_numero_seguro, p_puesto, p_sueldo_base, p_descuentos, p_comision, p_prestacion, p_capacitacion, p_prestamo, @encrypted_password, p_estado);

    COMMIT;
END//

-- Procedimiento para registrar un nuevo cliente
CREATE PROCEDURE RegistrarNuevoCliente(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_direccion TEXT,
    IN p_identificacion VARCHAR(50),
    IN p_contrasena VARCHAR(100),
    IN p_estado VARCHAR(20)  -- Estado inicial: Nuevo
)
BEGIN
    DECLARE exit handler for sqlexception, sqlwarning
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Encriptar la contraseña utilizando AES
    SET @encrypted_password = AES_ENCRYPT_STRING(p_contrasena, 'my_secret_key');

    -- Insertar el nuevo cliente con estado inicial
    INSERT INTO Clientes (nombre, apellido, telefono, email, direccion, identificacion, contrasena_encrypted, estado)
    VALUES (p_nombre, p_apellido, p_telefono, p_email, p_direccion, p_identificacion, @encrypted_password, p_estado);

    COMMIT;
END//

DELIMITER ;

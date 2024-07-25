-- Generar clave maestra para encriptación
SET @master_key = 'my_master_key'; -- Reemplaza con una clave segura

-- Crear certificado y clave asimétrica para encriptación
CREATE CERTIFICATE master_cert
    WITH SUBJECT = 'Master Certificate';

-- Crear clave privada asociada al certificado
CREATE ASYMMETRIC KEY master_key
    WITH ALGORITHM = RSA
    ENCRYPTION BY PASSWORD = 'password'
    FROM CERTIFICATE master_cert;

-- Función para encriptar contraseña utilizando AES con clave maestra
CREATE FUNCTION AES_ENCRYPT_STRING(input_string TEXT) RETURNS VARBINARY(255)
BEGIN
    DECLARE encrypted_string VARBINARY(255);
    SET encrypted_string = AES_ENCRYPT(input_string, @master_key);
    RETURN encrypted_string;
END;

-- Función para desencriptar contraseña utilizando AES con clave maestra
CREATE FUNCTION AES_DECRYPT_STRING(encrypted_string VARBINARY(255)) RETURNS TEXT
BEGIN
    DECLARE decrypted_string TEXT;
    SET decrypted_string = AES_DECRYPT(encrypted_string, @master_key);
    RETURN decrypted_string;
END;


-- Procedimiento para encriptar contraseña de empleados
CREATE PROCEDURE EncriptarContrasenaEmpleado(
    IN p_id_empleado INT,
    IN p_contrasena TEXT
)
BEGIN
    -- Validar permisos para encriptar contraseñas
    -- Aquí debes implementar tu lógica para validar roles o permisos
    -- Por ejemplo, verificar si el usuario actual tiene el rol adecuado

    -- Encriptar la contraseña utilizando AES
    SET @encrypted_password = AES_ENCRYPT_STRING(p_contrasena);

    -- Actualizar la contraseña encriptada en la tabla de empleados
    UPDATE Empleados
    SET contrasena_encrypted = @encrypted_password
    WHERE id_empleado = p_id_empleado;
END;

-- Procedimiento para desencriptar contraseña de empleados (solo para demostración, no recomendado en producción)
CREATE PROCEDURE DesencriptarContrasenaEmpleado(
    IN p_id_empleado INT
)
BEGIN
    -- Validar permisos para desencriptar contraseñas
    -- Lógica de permisos aquí

    -- Desencriptar la contraseña utilizando AES
    SELECT AES_DECRYPT_STRING(contrasena_encrypted) AS contrasena_desencriptada
    FROM Empleados
    WHERE id_empleado = p_id_empleado;
END;

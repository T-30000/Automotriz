-- Crear base de datos Automotriz si no existe
CREATE DATABASE IF NOT EXISTS Automotriz;

-- Usar la base de datos Automotriz
USE Automotriz;

-- Tabla Clientes
CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    identificacion VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    contrasena_encrypted VARBINARY(255),  -- Almacena la contraseña cifrada
    estado VARCHAR(20) DEFAULT 'Nuevo'
);

-- Tabla Empleados
CREATE TABLE IF NOT EXISTS Empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    fecha_contrato DATE,
    numero_seguro VARCHAR(50),
    puesto VARCHAR(50),
    sueldo_base DECIMAL(10, 2),
    descuentos DECIMAL(10, 2),
    comision DECIMAL(10, 2),
    prestacion DECIMAL(10, 2),
    capacitacion VARCHAR(100),
    prestamo DECIMAL(10, 2),
    correo VARCHAR(100) UNIQUE,
    contrasena_encrypted VARBINARY(255),  -- Almacena la contraseña cifrada
    estado VARCHAR(20) DEFAULT 'Solicitado'
);


-- Tabla Autos
CREATE TABLE IF NOT EXISTS Autos (
    numero_serie VARCHAR(50) PRIMARY KEY,
    tipo_auto VARCHAR(20),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    anio YEAR,
    cilindros INT,
    disponibilidad BOOLEAN,
    precio DECIMAL(10, 2),
    puertas INT,
    color VARCHAR(20),
    seguro_id INT,
    servicio DECIMAL(10, 2),
    garantia DECIMAL(10, 2),
    costo DECIMAL(10, 2),
    descuento DECIMAL(10, 2),
    costo_venta DECIMAL(10, 2),
    FOREIGN KEY (seguro_id) REFERENCES Seguro(id_seguro)
);

-- Tabla Pagos
CREATE TABLE IF NOT EXISTS Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    tipo_pago_id INT,
    monto DECIMAL(10, 2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (tipo_pago_id) REFERENCES Tipos_Pagos(id_tipo_pago)
);

-- Tabla Autos_Eliminados
CREATE TABLE IF NOT EXISTS Autos_Eliminados (
    numero_serie VARCHAR(50) PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    cilindros INT,
    anio YEAR,
    fecha_eliminacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Seguro
CREATE TABLE IF NOT EXISTS Seguro (
    id_seguro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    tipo_seguro VARCHAR(30)
);

-- Tabla Tipos_Pagos
CREATE TABLE IF NOT EXISTS Tipos_Pagos (
    id_tipo_pago INT AUTO_INCREMENT PRIMARY KEY,
    tipo_pago VARCHAR(20),
    detalle_pago VARCHAR(100)
);

-- Tabla Zonas
CREATE TABLE IF NOT EXISTS Zonas (
    id_zona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla Sucursales
CREATE TABLE IF NOT EXISTS Sucursales (
    id_sucursal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    direccion TEXT,
    id_zona INT,
    FOREIGN KEY (id_zona) REFERENCES Zonas(id_zona)
);

-- Tabla Historial_Cambios
CREATE TABLE IF NOT EXISTS Historial_Cambios (
    id_cambio INT AUTO_INCREMENT PRIMARY KEY,
    tabla_afectada VARCHAR(50),
    operacion VARCHAR(10),
    registro_id VARCHAR(50),
    campo_afectado VARCHAR(50),
    valor_anterior TEXT,
    valor_nuevo TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    empleado_id INT,
    FOREIGN KEY (empleado_id) REFERENCES Empleados(id_empleado)
);

-- Tabla Roles
CREATE TABLE IF NOT EXISTS Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla Permisos
CREATE TABLE IF NOT EXISTS Permisos (
    id_permiso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla Roles_Permisos
CREATE TABLE IF NOT EXISTS Roles_Permisos (
    rol_id INT,
    permiso_id INT,
    FOREIGN KEY (rol_id) REFERENCES Roles(id_rol),
    FOREIGN KEY (permiso_id) REFERENCES Permisos(id_permiso),
    PRIMARY KEY (rol_id, permiso_id)
);

-- Tabla Usuarios_Roles
CREATE TABLE IF NOT EXISTS Usuarios_Roles (
    usuario_id INT,
    rol_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Empleados(id_empleado),
    FOREIGN KEY (rol_id) REFERENCES Roles(id_rol),
    PRIMARY KEY (usuario_id, rol_id)
);

-- Tabla Cuentas
CREATE TABLE IF NOT EXISTS Cuentas (
    id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    numero_cuenta VARCHAR(50),
    tipo_cuenta VARCHAR(50),
    saldo DECIMAL(10, 2)
);

-- Tabla Credenciales para autenticación centralizada
CREATE TABLE IF NOT EXISTS Credenciales (
    id_credencial INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100) NOT NULL
);

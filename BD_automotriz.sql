-- Crear base de datos
Create database Automotriz;
Use Automotriz;

-- Crear tablas principales
Create table clientes
(
	id_cliente primary key int Identity(1,1) Not Null,
	nombre_cliente varchar(50),
	apellido_cliente varchar(50),
	numero_cliente varchar(10),
	correo_cliente varchar(200),
	contraseña_cliente varchar(20),
	identificacion_cliente varchar(50)
);
Create table clientes_pago
(
	id_pago primary key int identity(1,1) not null,
	id_cliente int,
	tarjeta_pago varchar(20),
	cvc_pago varchar(3),
	fecha_pago varchar(5),
	foreign key id_cliente references clientes(id_cliente),
);
Create table empleados
(
	id_empleado primary key int identity(1,1) not null,
	nombre_empleado varchar(50),
	apellido_empleado varchar(50),
	coreo_empleado varchar(50),
	contrasena_empleado varchar(20),
	direccion_empleado varchar(100),
	ciudad_empleado varchar(100),
	cp_empleado varchar(5),
	fecha_contrato date,
	numero_seguro_empleado varchar(20),
	puesto varchar(20),
	turno varchar(20),
	numero_cuenta_empleado varchar(20),
	sueldo_empleado decimal(10,2),
	descuento_empleado int,
	comision_empleado int,
	prestacion_empleado int,
	capacitacion_empleado int,
	prestamo_empleado int
);
Create table autos
(
	id_auto primary key int identity(1,1) not null,
	tipo_auto varchar(10),
	id_marca int,
	modelo_auto varchar(50),
	año_auto date,
	cilindros varchar(50),
	disponibilidad varchar(20),
	precio decimal(10,2),
	numero_puertas_auto int,
	color_auto varchar(20),
	seguro_auto varchar(20),
	garantia_auto varchar(20),
	costo decimal(10,2),
	descuento int,
	costo_venta_auto decimal(10,2),
	foreign key id_marca references marcas(id_marcas)
);
Create table marcas
(
	id_marcas primary key auto_increment not null,
	nombre_marca varchar(50),
	fecha_inicio_marca date
);
-- Niveles de Aislamiento

-- Indices

-- Vistas

-- Procedimientos almacenados del crud basico

-- Triggers

-- Transacciones

-- Encriptadores y Desencriptadores

-- Consultas con agregaciones

-- Subconsultas


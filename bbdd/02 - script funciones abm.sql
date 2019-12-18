------------------------------------------------------------------------------------------ FUNCIONES ABM
-- DROP FUNCION nombre_ej

-- FUNCIONES USUARIO

CREATE OR REPLACE FUNCTION alta_usuario(nombre_nuevo varchar, contrasenia_nuevo varchar, tipousuario_nuevo varchar) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY INSERT INTO usuario(nombre, contrasenia, tipousuario) 
								VALUES (nombre_nuevo, contrasenia_nuevo, tipousuario_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_usuario(id_usuario int) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY DELETE FROM usuario WHERE usuario.id = id_usuario RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_usuario(id_usuario int, nombre_nuevo varchar, contrasenia_nuevo varchar, tipousuario_nuevo varchar) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY UPDATE usuario SET nombre = nombre_nuevo, contrasenia = contrasenia_nuevo,
									tipousuario = tipousuario_nuevo WHERE id = id_usuario RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES CONDUCTOR

CREATE OR REPLACE FUNCTION alta_conductor(dni_nuevo varchar, nombre_nuevo varchar, apellido_nuevo varchar) RETURNS SETOF conductor AS
$$
BEGIN
	RETURN QUERY INSERT INTO conductor(dni, nombre, apellido) VALUES (dni_nuevo, nombre_nuevo, apellido_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES DOMINIO

CREATE OR REPLACE FUNCTION alta_dominio(id_nuevo varchar, descripcion_nuevo varchar) RETURNS SETOF dominio AS
$$
BEGIN
	RETURN QUERY INSERT INTO dominio(id, descripcion) VALUES (id_nuevo, descripcion_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_dominio(id_dominio varchar, descripcion_nuevo varchar) RETURNS SETOF dominio AS
$$
BEGIN
	RETURN QUERY UPDATE dominio SET descripcion = descripcion_nuevo WHERE id = id_dominio RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES EXAMINADOR

CREATE OR REPLACE FUNCTION alta_examinador(nombre_nuevo varchar, apellido_nuevo varchar, idusuario_nuevo int) RETURNS SETOF examinador AS
$$
BEGIN
	RETURN QUERY INSERT INTO examinador(nombre, apellido, idusuario) 
								VALUES (nombre_nuevo, apellido_nuevo, idusuario_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_examinador(id_examinador int) RETURNS SETOF examinador AS
$$
BEGIN
	RETURN QUERY UPDATE examinador SET activo = false WHERE id = id_examinador RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES EQUIPO

CREATE OR REPLACE FUNCTION alta_equipo(nombre_nuevo varchar, activo_nuevo boolean) RETURNS SETOF equipo AS
$$
BEGIN
	RETURN QUERY INSERT INTO equipo(nombre, activo) VALUES (nombre_nuevo, activo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_equipo(id_equipo int) RETURNS SETOF equipo AS
$$
BEGIN
	RETURN QUERY UPDATE equipo SET activo = false WHERE id = id_equipo RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES PERIODOUTILIZABLE

CREATE OR REPLACE FUNCTION alta_periodoutilizable(fechainicio_nuevo date, fechavencimiento_nuevo date, 
												  nroingreso_nuevo int, idequipo_nuevo int) RETURNS SETOF periodoutilizable AS
$$
BEGIN
	RETURN QUERY INSERT INTO periodoutilizable(fechainicio, fechavencimiento, nroingreso, idequipo) 
						VALUES (fechainicio_nuevo, fechavencimiento_nuevo, nroingreso_nuevo, idequipo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_periodoutilizable(id_periodoutilizable int) RETURNS SETOF periodoutilizable AS
$$
BEGIN
	RETURN QUERY UPDATE periodoutilizable SET activo = false WHERE id = id_periodoutilizable RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES PRESTAMO

CREATE OR REPLACE FUNCTION alta_prestamo(fechaprestamo_nuevo date, horaprestamo_nuevo time, nroinicial_nuevo int, 
										 idexaminador_nuevo int, idequipo_nuevo int) RETURNS SETOF prestamo AS
$$
BEGIN
	RETURN QUERY INSERT INTO prestamo(fechaprestamo, horaprestamo, nroinicial, idexaminador, idequipo) 
						VALUES (fechaprestamo_nuevo, horaprestamo_nuevo, nroinicial_nuevo, 
								idexaminador_nuevo, idequipo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_prestamo(id_prestamo int, fechadevolucion_nuevo date, horadevolucion_nuevo time,
										 nrodevolucion_nuevo int) RETURNS SETOF prestamo AS
$$
BEGIN
	RETURN QUERY UPDATE prestamo SET activo = false, fechadevolucion = fechadevolucion_nuevo,
									 horadevolucion = horadevolucion_nuevo, nrodevolucion = nrodevolucion_nuevo 
								WHERE id = id_prestamo RETURNING *;
END;
$$
LANGUAGE 'plpgsql';


-- FUNCIONES PRUEBA

CREATE OR REPLACE FUNCTION alta_prueba(fecha_nuevo date, hora_nuevo time, nromuestra_nuevo int, resultado_nuevo float, 
									   nroacta_nuevo int, nroretencion_nuevo int, dniconductor_nuevo varchar,
									   iddominio_nuevo varchar, idprestamo_nuevo int) RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor,
									iddominio, idprestamo) 
						VALUES (fecha_nuevo, hora_nuevo, nromuestra_nuevo, resultado_nuevo, nroacta_nuevo, 
								nroretencion_nuevo, dniconductor_nuevo,iddominio_nuevo, idprestamo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_prueba(id_prueba int, rechazado_nuevo boolean, descripcionrechazo_nuevo varchar) 
RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY UPDATE prueba SET verificado = true, rechazado = rechazado_nuevo, descripcionrechazo = descripcionrechazo_nuevo 
								WHERE id = id_prueba RETURNING *;
END;
$$
LANGUAGE 'plpgsql';




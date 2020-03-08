-- FUNCIONES PRUEBA

CREATE OR REPLACE FUNCTION alta_prueba(fecha_nuevo date, hora_nuevo time, nromuestra_nuevo int, resultado_nuevo float, nroacta_nuevo int, nroretencion_nuevo int, dniconductor_nuevo varchar, iddominio_nuevo varchar, idprestamo_nuevo int) RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor,iddominio, idprestamo) 
		VALUES (fecha_nuevo, hora_nuevo, nromuestra_nuevo, resultado_nuevo, nroacta_nuevo, nroretencion_nuevo, dniconductor_nuevo,iddominio_nuevo, idprestamo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_prueba(id_prueba int, rechazado_nuevo boolean, descripcionrechazo_nuevo varchar) 
RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY 
		UPDATE prueba SET verificado = true, rechazado = rechazado_nuevo, descripcionrechazo = descripcionrechazo_nuevo WHERE id = id_prueba RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
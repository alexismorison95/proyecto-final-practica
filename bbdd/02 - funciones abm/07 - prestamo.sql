-- FUNCIONES PRESTAMO

CREATE OR REPLACE FUNCTION alta_prestamo(fechaprestamo_nuevo date, horaprestamo_nuevo time, nroinicial_nuevo int, idexaminador_nuevo int, idequipo_nuevo int) RETURNS SETOF prestamo AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO prestamo(fechaprestamo, horaprestamo, nroinicial, idexaminador, idequipo) 
		VALUES (fechaprestamo_nuevo, horaprestamo_nuevo, nroinicial_nuevo, idexaminador_nuevo, idequipo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_prestamo(id_prestamo int, fechadevolucion_nuevo date, horadevolucion_nuevo time, nrodevolucion_nuevo int) RETURNS SETOF prestamo AS
$$
BEGIN
	RETURN QUERY 
		UPDATE prestamo SET activo = false, fechadevolucion = fechadevolucion_nuevo, horadevolucion = horadevolucion_nuevo, nrodevolucion = nrodevolucion_nuevo WHERE id = id_prestamo RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
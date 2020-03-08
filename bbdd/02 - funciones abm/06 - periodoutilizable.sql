-- FUNCIONES PERIODOUTILIZABLE. FALTA MODIFICACION

CREATE OR REPLACE FUNCTION alta_periodoutilizable(fechainicio_nuevo date, fechavencimiento_nuevo date, nroingreso_nuevo int, idequipo_nuevo int) RETURNS SETOF periodoutilizable AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO periodoutilizable(fechainicio, fechavencimiento, nroingreso, idequipo) 
		VALUES (fechainicio_nuevo, fechavencimiento_nuevo, nroingreso_nuevo, idequipo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_periodoutilizable(id_periodoutilizable int) RETURNS SETOF periodoutilizable AS
$$
BEGIN
	RETURN QUERY 
		UPDATE periodoutilizable SET activo = false WHERE id = id_periodoutilizable RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
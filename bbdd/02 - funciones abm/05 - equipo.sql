-- FUNCIONES EQUIPO. FALTA MODIFICACION

CREATE OR REPLACE FUNCTION alta_equipo(nombre_nuevo varchar, activo_nuevo boolean) RETURNS SETOF equipo AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO equipo(nombre, activo) VALUES (nombre_nuevo, activo_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_equipo(id_equipo int) RETURNS SETOF equipo AS
$$
BEGIN
	RETURN QUERY 
		UPDATE equipo SET activo = false WHERE id = id_equipo RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

-------------------------

-- Se podria modificar el numero actual del equipo???
CREATE OR REPLACE FUNCTION modificacion_equipo(id_equipo int, nombre_nuevo varchar) RETURNS SETOF equipo AS
$$
BEGIN
	RETURN QUERY 
		UPDATE equipo SET nombre = nombre_nuevo WHERE id = id_equipo RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
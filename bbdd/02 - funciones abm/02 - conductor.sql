-- FUNCIONES CONDUCTOR. FALTA MODIFICACION

CREATE OR REPLACE FUNCTION alta_conductor(dni_nuevo varchar, nombre_nuevo varchar, apellido_nuevo varchar) RETURNS SETOF conductor AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO conductor(dni, nombre, apellido) 
		VALUES (dni_nuevo, nombre_nuevo, apellido_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

----------------------------

CREATE OR REPLACE FUNCTION modificar_conductor(dni_conductor varchar, nombre_nuevo varchar, apellido_nuevo varchar) RETURNS SETOF conductor AS
$$
BEGIN
	RETURN QUERY 
		UPDATE conductor SET nombre = nombre_nuevo, apellido = apellido_nuevo WHERE dni = dni_conductor RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
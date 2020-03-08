-- FUNCIONES DOMINIO

CREATE OR REPLACE FUNCTION alta_dominio(id_nuevo varchar, descripcion_nuevo varchar) RETURNS SETOF dominio AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO dominio(id, descripcion) VALUES (id_nuevo, descripcion_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_dominio(id_dominio varchar, descripcion_nuevo varchar) RETURNS SETOF dominio AS
$$
BEGIN
	RETURN QUERY 
		UPDATE dominio SET descripcion = descripcion_nuevo WHERE id = id_dominio RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
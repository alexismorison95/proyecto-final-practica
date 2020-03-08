-- FUNCIONES EXAMINADOR. ALTA EXAMINADOR YA NO SE HARIA, SE HACE POR MEDIO DE ALTA USUARIO
-- FALTA MODIFICACION. DEBERIA PONERSE EN UN TRIGGER 

-- CREATE OR REPLACE FUNCTION alta_examinador(nombrereal_nuevo varchar, idusuario_nuevo int) RETURNS SETOF examinador AS
-- $$
-- BEGIN
-- 	RETURN QUERY INSERT INTO examinador(nombrereal, idusuario) 
-- 								VALUES (nombrereal_nuevo, idusuario_nuevo) RETURNING *;
-- END;
-- $$
-- LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_examinador(id_examinador int) RETURNS SETOF examinador AS
$$
BEGIN
	RETURN QUERY 
		UPDATE examinador SET activo = false WHERE id = id_examinador RETURNING *;
END;
$$
LANGUAGE 'plpgsql';
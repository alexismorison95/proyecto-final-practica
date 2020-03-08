-- FUNCIONES USUARIO

CREATE OR REPLACE FUNCTION alta_usuario(nombreReal_nuevo varchar, nombreUsuario_nuevo varchar, contrasenia_nuevo varchar, tipousuario_nuevo varchar) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY 
		INSERT INTO usuario(nombrereal, nombreusuario, contrasenia, tipousuario) 
		VALUES (nombreReal_nuevo, nombreUsuario_nuevo, contrasenia_nuevo, tipousuario_nuevo) RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION baja_usuario(id_usuario int) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY 
		DELETE FROM usuario WHERE usuario.id = id_usuario RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

CREATE OR REPLACE FUNCTION modificacion_usuario(id_usuario int, nombreReal_nuevo varchar, nombreUsuario_nuevo varchar, contrasenia_nuevo varchar, tipousuario_nuevo varchar) RETURNS SETOF usuario AS
$$
BEGIN
	RETURN QUERY 
		UPDATE usuario SET nombrereal = nombreReal_nuevo, nombreusuario = nombreUsuario_nuevo, contrasenia = contrasenia_nuevo, tipousuario = tipousuario_nuevo WHERE id = id_usuario RETURNING *;
END;
$$
LANGUAGE 'plpgsql';

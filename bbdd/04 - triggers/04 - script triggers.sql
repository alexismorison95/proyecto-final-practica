------------------------------------------------------------------------------------------ TRIGGERS

-- COSAS PARA HACER
-- Al dar de baja un usuario, si es examinador hacer un trigger que de de baja ese examinador,
-- de la tabla examinadores

-- Tambien si se modifica el usuario y se pone como examinador hay que darlo de alta en la tabla examinadores






-- al dar de alta un nuevo periodoutilizable, actualizar en nroactual de equipo
CREATE OR REPLACE FUNCTION actualizar_nroactual_equipo_periodoutilizable() RETURNS trigger AS
$$
BEGIN

	UPDATE equipo SET nroactual = NEW.nroingreso, activo = true WHERE id = NEW.idequipo;
 
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER actualizar_periodoutilizable_trigger AFTER INSERT ON periodoutilizable
FOR EACH ROW EXECUTE PROCEDURE actualizar_nroactual_equipo_periodoutilizable();


----------------------------------

-- al dar de alta una nueva prueba, actualizar en nroactual de equipo
CREATE OR REPLACE FUNCTION actualizar_nroactual_equipo_prueba() RETURNS trigger AS
$$
DECLARE
	id_equipo integer;
BEGIN

	SELECT prestamo.idequipo INTO id_equipo FROM prestamo WHERE prestamo.id = NEW.idprestamo;

	UPDATE equipo SET nroactual = nroactual + 1 WHERE id = id_equipo;
 
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER nueva_prueba_actualizar_nroactual_equipo_trigger AFTER INSERT ON prueba
FOR EACH ROW EXECUTE PROCEDURE actualizar_nroactual_equipo_prueba();




-------------------------------------------------------------------- CONTROLES LOGICOS DE INTEGRIDAD Y REDUNDANCIA


-- VALIDACIONES DE INSERT

-- USUARIO
CREATE OR REPLACE FUNCTION insertar_usuario() RETURNS trigger AS
$$
BEGIN

	NEW.nombreReal = LOWER(NEW.nombreReal);
	
	NEW.tipousuario = LOWER(NEW.tipousuario);

	RETURN NEW;

END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insertar_usuario_trigger BEFORE INSERT ON usuario
FOR EACH ROW EXECUTE PROCEDURE insertar_usuario();

----------

CREATE OR REPLACE FUNCTION insertar_usuario_after() RETURNS trigger AS
$$
BEGIN

	-- AGREGUE ESTO PARA QUE CUANDO CREAS UN USUARIO, SI ES EXAMINADOR VA A LA TABLA EXAMINADORES
	IF NEW.tipousuario = 'examinador' THEN
		
		INSERT INTO examinador(nombrereal, idusuario) VALUES (NEW.nombreReal, NEW.id);
		
	END IF;

	RETURN NEW;

END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insertar_usuario_after_trigger AFTER INSERT ON usuario
FOR EACH ROW EXECUTE PROCEDURE insertar_usuario_after();

----------

CREATE OR REPLACE FUNCTION editar_usuario() RETURNS trigger AS
$$
BEGIN

	IF NEW.tipousuario = 'examinador' THEN
		
		INSERT INTO examinador(nombrereal, idusuario) VALUES (NEW.nombreReal, NEW.id);
		
	END IF;

	RETURN NEW;

END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER editar_usuario_trigger BEFORE UPDATE ON usuario
FOR EACH ROW EXECUTE PROCEDURE editar_usuario();

-------

CREATE OR REPLACE FUNCTION eliminar_usuario() RETURNS trigger AS
$$
BEGIN

	IF OLD.tipousuario = 'examinador' THEN
		
		UPDATE examinador SET activo=false, idusuario=null WHERE OLD.id = examinador.idusuario;
		
	END IF;

	RETURN OLD;

END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER eliminar_usuario_trigger BEFORE DELETE ON usuario
FOR EACH ROW EXECUTE PROCEDURE eliminar_usuario();


----------------------------------

-- CONDUCTOR
CREATE OR REPLACE FUNCTION insertar_conductor() RETURNS trigger AS
$$
BEGIN

	NEW.nombre = LOWER(NEW.nombre);
	
	NEW.apellido = LOWER(NEW.apellido);
 
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insertar_conductor_trigger BEFORE INSERT ON conductor
FOR EACH ROW EXECUTE PROCEDURE insertar_conductor();


----------------------------------

-- DOMINIO
CREATE OR REPLACE FUNCTION insertar_dominio() RETURNS trigger AS
$$
BEGIN

	NEW.descripcion = LOWER(NEW.descripcion);
 
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insertar_dominio_trigger BEFORE INSERT ON dominio
FOR EACH ROW EXECUTE PROCEDURE insertar_dominio();


----------------------------------

-- EXAMINADOR
-- CREATE OR REPLACE FUNCTION insertar_examinador() RETURNS trigger AS
-- $$
-- BEGIN

-- 	NEW.nombre = LOWER(NEW.nombre);
	
-- 	NEW.apellido = LOWER(NEW.apellido);
 
-- 	RETURN NEW;
-- END;
-- $$
-- LANGUAGE 'plpgsql';

-- CREATE TRIGGER insertar_examinador_trigger BEFORE INSERT ON examinador
-- FOR EACH ROW EXECUTE PROCEDURE insertar_examinador();


----------------------------------

-- EQUIPO
CREATE OR REPLACE FUNCTION insertar_equipo() RETURNS trigger AS
$$
BEGIN

	NEW.nombre = LOWER(NEW.nombre);
	
	IF NEW.nroactual = 0 THEN
		
		RAISE EXCEPTION 'El número actual del equipo debe ser distinto de cero.';
		
	END IF;
 	
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insertar_equipo_trigger BEFORE INSERT ON equipo
FOR EACH ROW EXECUTE PROCEDURE insertar_equipo();


----------------------------------


-- VALIDACION DE ACTUALIZACION DE LAS PRUEBAS

CREATE OR REPLACE FUNCTION verificar_prueba() RETURNS trigger AS
$$
DECLARE
	id_usuario integer;
BEGIN
	
	IF NEW.verificado = false THEN
		
		RAISE EXCEPTION 'El estado de verificado debe ser true.';
		
	END IF;
	
	NEW.descripcionrechazo = LOWER(NEW.descripcionrechazo);
	
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER verificar_prueba_trigger BEFORE UPDATE ON prueba
FOR EACH ROW EXECUTE PROCEDURE verificar_prueba();













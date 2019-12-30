-- CARGAR POR PARTES!!!!

-- USUARIO

INSERT INTO usuario(nombreReal, nombreUsuario, contrasenia, tipousuario) VALUES ('martinez juan', 'juan', '1234', 'administrador');
INSERT INTO usuario(nombreReal, nombreUsuario, contrasenia, tipousuario) VALUES ('monzon pedro', 'pedro', '1234', 'administrativo');
INSERT INTO usuario(nombreReal, nombreUsuario, contrasenia, tipousuario) VALUES ('cosso carlos', 'carlos', '1234', 'examinador');
INSERT INTO usuario(nombreReal, nombreUsuario, contrasenia, tipousuario) VALUES ('morison alexis', 'usuario123', '1234', 'examinador');
INSERT INTO usuario(nombreReal, nombreUsuario, contrasenia, tipousuario) VALUES ('kloss laura', 'laura', '1234', 'examinador');


-- CONDUCTOR

INSERT INTO conductor(dni, nombre, apellido) VALUES ('38386790', 'alexis', 'morison');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('39346678', 'carla', 'monzon');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('28504932', 'monica', 'gobbi');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('19496583', 'ramiro', 'sanchez');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('37495039', 'jorge', 'delfino');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('23466886', 'alexis', 'rein');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('28768456', 'juan', 'mendez');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('35675677', 'pablo', 'cosso');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('38452433', 'silvina', 'pereyra');
INSERT INTO conductor(dni, nombre, apellido) VALUES ('28656432', 'gisela', 'morana');


-- DOMINIO

INSERT INTO dominio(id, descripcion) VALUES ('ab 123 cd', 'auto ford fiesta azul');
INSERT INTO dominio(id, descripcion) VALUES ('ab 567 cd', 'camioneta volkswagen amarok gris');
INSERT INTO dominio(id, descripcion) VALUES ('a 123 bcd', 'motocicleta honda cbr naranja');
INSERT INTO dominio(id, descripcion) VALUES ('b 456 acd', 'motocicleta yamaha fz azul');
INSERT INTO dominio(id, descripcion) VALUES ('nvz 087', 'auto peugeot 206 blanco');
INSERT INTO dominio(id, descripcion) VALUES ('ab 076 sd', 'auto peugeot 308 rojo');
INSERT INTO dominio(id, descripcion) VALUES ('b 067 dfs', 'motocicleta motomel dlx deluxe azul');
INSERT INTO dominio(id, descripcion) VALUES ('b 456 sdd', 'motocicleta rouser bajaj 220 amarilla');


-- EXAMINADOR

-- INSERT INTO examinador(nombre, apellido, idusuario) VALUES ('cosso carlos', 3);
-- INSERT INTO examinador(nombre, apellido, idusuario) VALUES ('morison alexis', 4);
-- INSERT INTO examinador(nombre, apellido, idusuario) VALUES ('kloss laura', 5);


-- EQUIPO

INSERT INTO equipo(nombre) VALUES ('ymc055');
INSERT INTO equipo(nombre) VALUES ('zvc344');
INSERT INTO equipo(nombre) VALUES ('ymc056');


-- PERIODOUTILIZABLE

INSERT INTO periodoutilizable(fechainicio, fechavencimiento, nroingreso, idequipo) VALUES ('26/02/2018', '26/08/2018', 2040, 1);
INSERT INTO periodoutilizable(fechainicio, fechavencimiento, nroingreso, idequipo) VALUES ('27/02/2018', '27/08/2018', 1234, 2);
INSERT INTO periodoutilizable(fechainicio, fechavencimiento, nroingreso, idequipo) VALUES ('18/10/2017', '18/04/2018', 4555, 3);


-- PRESTAMO

INSERT INTO prestamo(fechaprestamo, horaprestamo, nroinicial, idexaminador, idequipo) VALUES ('26/02/2018', '09:30', 2040, 1, 1);
INSERT INTO prestamo(fechaprestamo, horaprestamo, nroinicial, idexaminador, idequipo) VALUES ('27/02/2018', '18:30', 1234, 2, 2);
INSERT INTO prestamo(fechaprestamo, horaprestamo, nroinicial, idexaminador, idequipo) VALUES ('19/01/2018', '09:30', 4555, 3, 3);


-- PRUEBA

INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('26/02/2018', '20:35', 4555, 1.5, 2345, 3457, '38386790', 'ab 123 cd', 3);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('26/02/2018', '17:35', 4556, 0.0, '38386790', 'ab 567 cd', 3);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('27/02/2018', '21:26', 2040, 0.5, 4567, 7899, '39346678', 'a 123 bcd', 1);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('27/02/2018', '21:30', 2041, 0.0, '28504932', 'ab 123 cd', 1);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('04/03/2018', '21:36', 1234, 0.0, '19496583', 'b 456 acd', 2);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('05/03/2018', '17:35', 4557, 2.0, 5677, 2344, '23466886', 'b 456 sdd', 3);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('05/03/2018', '17:40', 4558, 0.0, '28768456', 'b 067 dfs', 3);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('05/03/2018', '17:40', 2042, 1.7, 6788, 3456, '35675677', 'ab 076 sd', 1);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('05/03/2018', '17:50', 2043, 0.0, '38386790', 'ab 123 cd', 1);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('17/04/2018', '22:00', 4559, 0.0, '37495039', 'b 456 acd', 3);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('19/04/2018', '21:36', 1235, 1.3, 23445, 4577, '38452433', 'ab 076 sd', 2);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, nroacta, nroretencion, dniconductor, iddominio, idprestamo)
VALUES ('19/04/2018', '21:45', 1236, 0.6, 6788, 3456, '28656432', 'nvz 087', 2);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('19/04/2018', '22:00', 1237, 0.0, '19496583', 'b 456 acd', 2);
INSERT INTO prueba(fecha, hora, nromuestra, resultado, dniconductor, iddominio, idprestamo)
VALUES ('15/06/2018', '23:50', 2045, 0.0, '28656432', 'nvz 087', 1);



-- TRANSACCIONES

-- alta de prueba en la que no hay un conductor y un dominio en la bbdd

BEGIN;

SELECT alta_conductor('12354568','luis','borges');

SELECT alta_dominio('ac 123 sd', 'auto ford fiesta rojo');

SELECT alta_prueba('15/07/2018', '03:50', 2046, 0.6, null, null, '12354568', 'ac 123 sd', 1);

COMMIT;


-- verificiacion de la prueba cargada anteriormente, donde es rechazada

BEGIN;

SELECT modificacion_prueba(15, true, 'No se cargo el numero de acta y el numero de retencion');

COMMIT;


-- baja de un prestamo entre un examinador y un equipo

BEGIN;

SELECT baja_prestamo(1, '26/07/2018', '10:40', 2046);

COMMIT;
------------------------------------------------------------------------------------------ REPORTES

-- historial por dominio
CREATE OR REPLACE FUNCTION reporte_por_dominio(iddominio_buscado varchar) RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY SELECT * FROM prueba WHERE prueba.iddominio = iddominio_buscado;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- historial por dni
CREATE OR REPLACE FUNCTION reporte_por_dni(dniconductor_buscado varchar) RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY SELECT * FROM prueba WHERE prueba.dniconductor = dniconductor_buscado;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- historial entre fechas
CREATE OR REPLACE FUNCTION reporte_entre_fechas(fecha1 date, fecha2 date) RETURNS SETOF prueba AS
$$
BEGIN
	RETURN QUERY SELECT * FROM prueba WHERE prueba.fecha >= fecha1 AND prueba.fecha <= fecha2;
END;
$$
LANGUAGE 'plpgsql';



------------------------------------------------------------------------------------------ REPORTES GRAFICOS

-- cantidad de controles entre fechas
CREATE OR REPLACE FUNCTION reporte_entre_fechas_cant_controles(fecha1 date, fecha2 date) 
RETURNS SETOF bigint AS
$$
BEGIN
	RETURN QUERY SELECT COUNT (*) AS cantidad
        		 FROM prueba
      			 WHERE prueba.fecha >= fecha1 AND prueba.fecha <= fecha2;
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- cantidad de controles entre meses del mismo año
CREATE OR REPLACE FUNCTION reporte_entre_meses_cant_controles(fecha1 date, fecha2 date,
															OUT cantidad bigint, OUT mes double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT COUNT (*) AS cantidad, EXTRACT(MONTH FROM prueba.fecha) AS mes
        		 FROM prueba
      			 WHERE prueba.fecha >= fecha1 AND prueba.fecha <= fecha2
    			 GROUP BY EXTRACT(MONTH FROM prueba.fecha)
				 ORDER BY EXTRACT(MONTH FROM prueba.fecha);
END;
$$
LANGUAGE 'plpgsql';

--select count(*), extract(month from prueba.fecha) as mes from prueba group by extract(month from prueba.fecha)

--------------------------

-- cantidad de controles entre años
CREATE OR REPLACE FUNCTION reporte_entre_anios_cant_controles(anio1 double precision, anio2 double precision, 
															OUT cantidad bigint, OUT anio double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT COUNT (*) AS cantidad, EXTRACT(YEAR FROM prueba.fecha) AS anio
        		 FROM prueba
      			 WHERE EXTRACT(YEAR FROM prueba.fecha) >= anio1 AND EXTRACT(YEAR FROM prueba.fecha) <= anio2
    			 GROUP BY EXTRACT(YEAR FROM prueba.fecha)
				 ORDER BY EXTRACT(YEAR FROM prueba.fecha);
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- cantidad de test positivos y negativos entre meses del mismo año
CREATE OR REPLACE FUNCTION reporte_entre_meses_cant_pos_neg(anio double precision, mes1 double precision, 
															mes2 double precision, 
															OUT negativos bigint, OUT positivos bigint, 
															OUT mes double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT SUM(CASE WHEN a.resultado = 0.0 THEN 1 ELSE 0 END) AS negativos,
						SUM(CASE WHEN a.resultado > 0.0 THEN 1 ELSE 0 END) AS positivos, 
						EXTRACT(MONTH FROM a.fecha) AS mes
				 FROM
				 	(SELECT * FROM prueba
					 WHERE EXTRACT(YEAR FROM prueba.fecha) = anio) as a
				 WHERE EXTRACT(MONTH FROM a.fecha) >= mes1 AND EXTRACT(MONTH FROM a.fecha) <= mes2
				 GROUP BY EXTRACT(MONTH FROM a.fecha)
				 ORDER BY EXTRACT(MONTH FROM a.fecha);
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- cantidad de test positivos y negativos entre años
CREATE OR REPLACE FUNCTION reporte_entre_anios_cant_pos_neg(anio1 double precision, anio2 double precision, 
															OUT negativos bigint, OUT positivos bigint, 
															OUT anio double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT SUM(CASE WHEN resultado = 0.0 THEN 1 ELSE 0 END) AS negativos,
						SUM(CASE WHEN resultado > 0.0 THEN 1 ELSE 0 END) AS positivos, 
						EXTRACT(YEAR FROM prueba.fecha) AS anio
        		 FROM prueba
      			 WHERE EXTRACT(YEAR FROM prueba.fecha) >= anio1 AND EXTRACT(YEAR FROM prueba.fecha) <= anio2
				 GROUP BY EXTRACT(YEAR FROM prueba.fecha)
				 ORDER BY EXTRACT(YEAR FROM prueba.fecha);
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- promedio de graduaciones entre meses del mismo año??
CREATE OR REPLACE FUNCTION reporte_entre_meses_graduaciones(anio double precision, mes1 double precision, 
															mes2 double precision, 
															OUT promedio double precision, 
															OUT mes double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT (SUM(a.resultado)/COUNT (*)) AS promedio, EXTRACT(MONTH FROM a.fecha) AS mes
        		 FROM (SELECT * FROM prueba
					   WHERE EXTRACT(YEAR FROM prueba.fecha) = anio) as a
      			 WHERE EXTRACT(MONTH FROM a.fecha) >= mes1 AND EXTRACT(MONTH FROM a.fecha) <= mes2
    			 GROUP BY EXTRACT(MONTH FROM a.fecha)
				 ORDER BY EXTRACT(MONTH FROM a.fecha);
END;
$$
LANGUAGE 'plpgsql';

--------------------------

-- promedio de graduaciones entre años??
CREATE OR REPLACE FUNCTION reporte_entre_anios_graduaciones(anio1 double precision, anio2 double precision, 
															OUT promedio double precision, 
															OUT anio double precision) 
RETURNS SETOF record AS
$$
BEGIN
	RETURN QUERY SELECT (SUM(prueba.resultado)/COUNT (*)) AS promedio, EXTRACT(YEAR FROM prueba.fecha) AS anio
        		 FROM prueba
      			 WHERE EXTRACT(YEAR FROM prueba.fecha) >= anio1 AND EXTRACT(YEAR FROM prueba.fecha) <= anio2
    			 GROUP BY EXTRACT(YEAR FROM prueba.fecha)
				 ORDER BY EXTRACT(YEAR FROM prueba.fecha);
END;
$$
LANGUAGE 'plpgsql';


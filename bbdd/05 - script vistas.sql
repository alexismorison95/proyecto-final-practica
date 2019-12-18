------------------------------------------------------------------------------------------ VISTAS

-- vista que liste la cantidad de positivos y negativos en la ultima semana
create view vista_cant_positivos_negativos_ultimos_7_dias as 
	SELECT SUM(CASE WHEN resultado = 0.0 THEN 1 ELSE 0 END) AS negativos,
			SUM(CASE WHEN resultado > 0.0 THEN 1 ELSE 0 END) AS positivos, 
			prueba.fecha
    FROM prueba
	WHERE prueba.fecha >= CURRENT_DATE - 7 AND prueba.fecha <= CURRENT_DATE
	GROUP BY prueba.fecha
	ORDER BY prueba.fecha;

--------------------------


-- vista que liste la cantidad de pruebas en la ultima semana
create view vista_cant_pruebas_ultimos_7_dias as 
	SELECT COUNT (*) AS cantidad, prueba.fecha
    FROM prueba
	WHERE prueba.fecha >= CURRENT_DATE - 7 AND prueba.fecha <= CURRENT_DATE
	GROUP BY prueba.fecha
	ORDER BY prueba.fecha;
	
--------------------------	

-- vista del resultado mas alto de pruebas en el ultimo mes
create view vista_resultado_mas_alto_ultimo_mes as 
	SELECT MAX(prueba.resultado), prueba.fecha
    FROM prueba
	WHERE prueba.fecha >= CURRENT_DATE - 30 AND prueba.fecha <= CURRENT_DATE
	GROUP BY prueba.resultado, prueba.fecha
	ORDER BY prueba.resultado desc
	LIMIT 1;
	
--------------------------	








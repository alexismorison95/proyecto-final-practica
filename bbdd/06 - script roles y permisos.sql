------------------------------------------------------------------------------------------ USUARIOS/ROLES

CREATE USER administrador PASSWORD 'asfAFsaf_@_423a.a';
CREATE USER examinador PASSWORD 'asfAFsaf_@_423a.a';
CREATE USER administrativo PASSWORD 'asfAFsaf_@_423a.a';
CREATE USER sesion_user PASSWORD 'asfAFsaf_@_423a.a';
CREATE USER login_user PASSWORD 'asfAFsaf_@_423a.a';


------------------------------------------------------------------------------------------ PERMISOS

-- ADMINISTRADOR_ROL
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO administrador;
--GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE prueba TO administrador_rol;
--GRANT SELECT ON TABLE conductor, dominio, equipo, examinador, periodoutilizable, prestamo, prueba, usuario TO administrador_rol;


-- EXAMINADOR_ROL
--GRANT SELECT,INSERT,UPDATE ON TABLE prueba TO examinador;
--REVOKE ALL PRIVILEGES ON TABLE conductor FROM administrador;
GRANT SELECT ON TABLE equipo, examinador, periodoutilizable, prestamo, prueba TO examinador;
GRANT SELECT, UPDATE ON TABLE usuario TO examinador;


-- ADMINISTRATIVO_ROL
GRANT SELECT ON TABLE conductor, dominio, equipo, examinador, periodoutilizable, prestamo, prueba TO administrativo;


-- SESION_MANEJO
-- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sesiones TO sesion_manejo;


-- LOGIN MANEJO
GRANT SELECT ON TABLE usuario TO login_user;


grant all on table sesiones to sesion_user;

--GRANT SELECT ON TABLE conductor, dominio, prueba TO administrador_rol, examinador_rol, administrativo_rol;


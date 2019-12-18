--create database alcoholemia;

------------------------------------------------------------------------------------------ TABLAS

-- serial para autoincremental
create table usuario (
	id serial primary key,
	nombre varchar not null,
	contrasenia varchar not null,
	tipousuario varchar
);

create table conductor (
	dni varchar primary key,
	nombre varchar not null,
	apellido varchar not null
);

create table dominio (
	id varchar primary key,
	descripcion varchar not null
);

create table examinador (
	id serial primary key,
	nombre varchar not null,
	apellido varchar not null,
	activo boolean default true,
	idusuario int references usuario(id)
);

create table equipo (
	id serial primary key,
	nombre varchar not null, 
	activo boolean default false,
	nroactual int
);

create table periodoutilizable (
	id serial primary key,
	activo boolean default true,
	fechainicio date not null,
	fechavencimiento date not null,
	nroingreso int not null,
	idequipo int references equipo(id)
);

create table prestamo (
	id serial primary key,
	activo boolean default true,
	fechaprestamo date not null,
	horaprestamo time not null,
	nroinicial int not null,
	fechadevolucion date,
	horadevolucion time,
	nrodevolucion int,
	idexaminador int references examinador(id),
	idequipo int references equipo(id)
);

create table prueba (
	id serial primary key,
	fecha date not null,
	hora time not null,
	nromuestra int not null,
	resultado float not null check(resultado >= 0.0),
	nroacta int,
	nroretencion int,
	verificado boolean default false,
	rechazado boolean default false,
	descripcionrechazo varchar,
	dniconductor varchar references conductor(dni),
	iddominio varchar references dominio(id),
	idprestamo int references prestamo(id)
);


---------------------------------------------------------------- TABLA PARA ADMINISTRAR SESIONES ACTIVAS SW
CREATE TABLE "sesiones" (
	"sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "sesiones" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
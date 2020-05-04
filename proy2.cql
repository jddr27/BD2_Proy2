CREATE KEYSPACE proyecto WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': '3'};

CREATE TABLE autor (
    idAutor         UUID,
    nombreAutor     TEXT,
    idPais          UUID,
    nombrePais      TEXT,
    sexo            INT,
    fechaNacimiento DATE,
    PRIMARY KEY (idAutor)
);

CREATE TABLE autor_por_nombre(
    idAutor     UUID,
    nombreAutor TEXT,
    PRIMARY KEY (nombreAutor, idAutor)
) WITH CLUSTERING ORDER BY (idAutor ASC);

CREATE TABLE area(
    idArea      UUID,
    nombreArea  TEXT,
    descripcion TEXT,
    ranking     INT,
    jefeArea    UUID,
    PRIMARY KEY (idArea)
);

CREATE TABLE area_por_ranking(
    idArea      UUID,
    nombreArea  TEXT,
    ranking     INT,
    PRIMARY KEY (idArea, ranking)
) WITH CLUSTERING ORDER BY (ranking DESC);

CREATE TABLE comision(
    idComision      UUID,
    nombreComision  TEXT,
    descripcion     TEXT,
    PRIMARY KEY (idComision)
);

CREATE TABLE profesionales_por_comision(
    idProfesional       UUID,
    nombreProfesional   TEXT,
    idComision          UUID,
    nombreComision      TEXT,
    PRIMARY KEY (nombreComision, idProfesional)
) WITH CLUSTERING ORDER BY (idProfesional ASC);

CREATE TABLE profesional(
    idProfesional       UUID,
    nombreProfesional   TEXT,
    idPais              UUID,
    nombrePais          TEXT,
    fechaNacimiento     DATE,
    fechaInicio         DATE,
    idArea              UUID,
    nombreArea          TEXT,
    PRIMARY KEY (idProfesional)
);

CREATE TABLE profesional_por_experiencia(
    idProfesional       UUID,
    nommbreProfesional  TEXT,
    fechaInicio         DATE,
    PRIMARY KEY (fechaInicio, idProfesional)
) WITH CLUSTERING ORDER BY (idProfesional ASC);

CREATE TABLE invento(
    idInvento           UUID,
    nombreInvento       TEXT,
    idAutor             UUID,
    nombreAutor         TEXT,
    descripcion         TEXT,
    fechaPresentacion   DATE,
    idPais              UUID,
    nombrePais          TEXT,
    idArea              UUID,
    nombreArea          TEXT,
    PRIMARY KEY (idInvento)
);

CREATE TABLE inventos_por_area(
    idInvento       UUID,
    nombreInvento   TEXT,
    idArea          UUID,
    nombreArea      TEXT,
    PRIMARY KEY (nombreArea, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_pais(
    idInvento       UUID,
    nombreInvento   TEXT,
    idPais          UUID,
    nombrePais      TEXT,
    PRIMARY KEY (nombrePais, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_autor(
    idInvento       UUID,
    nombreInvento   TEXT,
    idAutor         UUID,
    nombreAutor     TEXT,
    PRIMARY KEY (nombreAutor, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_fronteras(
    idInvento       UUID,
    nombreInvento   TEXT,
    idPais          UUID,
    nombrePais      TEXT,
    PRIMARY KEY (nombrePais, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_profesional(
    idInvento           UUID,
    nombreInvento       TEXT,
    idProfesional       UUID,
    nombreProfesional   TEXT,
    PRIMARY KEY (nombreProfesional, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);
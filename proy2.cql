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
    PRIMARY KEY (idArea)
);

CREATE TABLE area_por_ranking(
    idArea      UUID,
    nombreArea  TEXT,
    ranking     INT,
    PRIMARY KEY (idArea, ranking)
) WITH CLUSTERING ORDER BY (ranking DESC);

CREATE TABLE profesional(
    idProfesional       TEXT,
    nombreProfesional   TEXT,
    apellidoProfesional   TEXT,
    fechaInicio         DATE,
    PRIMARY KEY (idProfesional)
);

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

CREATE TABLE pais_por_a2c (
    a2c             TEXT,
    nombrePais      TEXT,
    PRIMARY KEY (nombrePais, a2c)
) WITH CLUSTERING ORDER BY (a2c ASC);

CREATE TABLE pais_por_a3c (
    a3c             TEXT,
    nombrePais      TEXT,
    PRIMARY KEY (nombrePais, a3c)
) WITH CLUSTERING ORDER BY (a3c ASC);

CREATE TABLE pais(
    nombrePais      TEXT,
    a2c             TEXT,
    a3c             TEXT,
    borders         SET<TEXT>,
    PRIMARY KEY (nombrePais)
);

CREATE KEYSPACE proyecto WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': '3'};

CREATE TABLE autor (
    idAutor         TEXT,
    nombreAutor     TEXT,
    apellidoAutor   TEXT,
    idPais          TEXT,
    PRIMARY KEY (idAutor, nombreAutor, apellidoAutor)
) WITH CLUSTERING ORDER BY (nombreAutor ASC, apellidoAutor ASC);

CREATE TABLE area(
    idArea      TEXT,
    nombreArea  TEXT,
    descripcion TEXT,
    ranking     INT,
    PRIMARY KEY (idArea)
);

CREATE TABLE profesional(
    idProfesional       TEXT,
    nombreProfesional   TEXT,
    apellidoProfesional TEXT,
    fechaInicio         DATE,
    areas               SET<TEXT>,
    PRIMARY KEY (idProfesional, nombreProfesional, apellidoProfesional)
)  WITH CLUSTERING ORDER BY (nombreProfesional ASC, apellidoProfesional ASC);

CREATE TABLE invento(
    idInvento           TEXT,
    nombreInvento       TEXT,
    idAutor             SET<TEXT>,
    nombreAutor         SET<TEXT>,
    descripcion         TEXT,
    fechaPresentacion   DATE,
    idPais              TEXT,
    nombrePais          TEXT,
    idArea              SET<TEXT>,
    nombreArea          SET<TEXT>,
    idProfesional       SET<TEXT>,
    nombreProfesional   SET<TEXT>,
    PRIMARY KEY (idInvento)
);

CREATE TABLE inventos_por_area(
    idInvento       TEXT,
    nombreInvento   TEXT,
    idArea          TEXT,
    PRIMARY KEY (idInvento, idArea)
) WITH CLUSTERING ORDER BY (idArea ASC);

CREATE TABLE inventos_por_pais(
    idInvento       TEXT,
    nombreInvento   TEXT,
    idPais          TEXT,
    PRIMARY KEY (idInvento, idPais)
) WITH CLUSTERING ORDER BY (idPais ASC);

CREATE TABLE inventos_por_autor(
    idInvento       TEXT,
    nombreInvento   TEXT,
    idAutor         TEXT,
    PRIMARY KEY (idInvento, idAutor)
) WITH CLUSTERING ORDER BY (idAutor ASC);

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

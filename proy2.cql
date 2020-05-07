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

CREATE TABLE profesional_por_area(
    idProfesional       TEXT,
    nombreProfesional   TEXT,
    idArea              TEXT,
    PRIMARY KEY (idArea, idProfesional)
)  WITH CLUSTERING ORDER BY (idProfesional ASC);

CREATE TABLE invento(
    idInvento           INT,
    nombreInvento       TEXT,
    idAutor             SET<TEXT>,
    nombreAutor         SET<TEXT>,
    descripcion         TEXT,
    fechaPresentacion   DATE,
    idPais              TEXT,
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
    PRIMARY KEY (idArea, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_pais(
    idInvento       TEXT,
    nombreInvento   TEXT,
    idPais          TEXT,
    PRIMARY KEY (idPais, idInvento)
) WITH CLUSTERING ORDER BY (idInvento ASC);

CREATE TABLE inventos_por_autor(
    idInvento       TEXT,
    nombreInvento   TEXT,
    idAutor         TEXT,
    PRIMARY KEY (idAutor, idInvento)
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

INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('A', 'Human Necessitites', 'Necesidades Humanas', 3);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('B', 'Performing Operations; Transporint', 'Operaciones', 3);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('C', 'Chemistry; Metallurgy', 'Quimica', 3);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('D', 'Textiles; paper', 'Textiles', 2);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('E', 'Fixed Constructing', 'Construcciones', 4);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('F', 'Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines; Pumps', 'Electronica', 4);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('G', 'Physics', 'Fisica', 4);
INSERT INTO area(idArea, nombreArea, descripcion, ranking)
    VALUES ('H', 'Electricity', 'Electricidad', 2);
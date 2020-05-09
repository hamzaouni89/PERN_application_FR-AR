CREATE DATABASE emission ;

CREATE TABLE emission (
    emission_id SERIAL PRIMARY KEY,
    nom_emission VARCHAR(50),
    dure INTEGER ,
    date_emission DATE,
    animateur VARCHAR(50),
    visiteur VARCHAR(50),
    id_chroniqueur INTEGER ,
    FOREIGN KEY (id_chroniqueur) REFERENCES chroniqueur(chroniqueur_id)
);


CREATE TABLE chroniqueur (
    chroniqueur_id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    date_naissance DATE,
    num_tel INTEGER
);


DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id serial PRIMARY KEY,
    email varchar(200) NOT NULL UNIQUE,
    passhash varchar(60) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE
);
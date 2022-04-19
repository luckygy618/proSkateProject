DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id serial PRIMARY KEY,
    email varchar(30) NOT NULL UNIQUE,
    passhash varchar(60) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    payment_token varchar(30) UNIQUE,
    customer_token varchar(30) UNIQUE,
    salutation varchar(6),
    first_name varchar(20),
    last_name varchar(20),
    phone varchar(15),
    ship_address1 varchar(40),
    ship_address2 varchar(40),
    ship_city varchar(20),
    ship_province varchar(20),
    ship_country varchar(20),
    ship_postal varchar(10),
    bill_address1 varchar(40),
    bill_address2 varchar(40),
    bill_city varchar(20),
    bill_province varchar(20),
    bill_country varchar(20),
    bill_postal varchar(10)
);

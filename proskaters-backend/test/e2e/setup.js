const debug = require('debug')('api:test:e2e:setup');

module.exports.PRODUCT_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS products (
    product_id varchar(10) PRIMARY KEY,
    product_name varchar(80) NOT NULL,
    image varchar(80) NOT NULL,
    price double precision NOT NULL,
    stock_amount int NOT NULL DEFAULT 0,
    sku varchar(20),
    brand varchar(30),
    intro text,
    description text,
    stock_status varchar(20),
    rating int NOT NULL DEFAULT 0
);`;

module.exports.ACCOUNT_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS accounts (
    id serial PRIMARY KEY,
    email varchar(30) NOT NULL UNIQUE,
    passhash varchar(60) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    payment_token varchar(30) UNIQUE,
    salutation varchar(6),
    first_name varchar(20),
    last_name varchar(20),
    phone varchar(15),
    ship_address1 varchar(40),
    ship_address2 varchar(40),
    ship_city varchar(20),
    ship_province varchar(20),
    ship_country varchar(20),
    ship_postal varchar(7),
    bill_address1 varchar(40),
    bill_address2 varchar(40),
    bill_city varchar(20),
    bill_province varchar(20),
    bill_country varchar(20),
    bill_postal varchar(7)
);`;

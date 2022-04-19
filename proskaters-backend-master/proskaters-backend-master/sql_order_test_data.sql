
DROP TABLE IF EXISTS orderlogs;
DROP TABLE IF EXISTS lineitems;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id serial PRIMARY KEY,
    transaction_token varchar(30) UNIQUE NOT NULL,
    email varchar(30) references accounts (email) NOT NULL,
    total_quantity int NOT NULL,
    subtotal double precision NOT NULL,
    status varchar(20) NOT NULL,
    creation_time timestamp NOT NULL,
    last_modified_time timestamp NOT NULL
);

CREATE TABLE lineitems (
    id serial PRIMARY KEY,
    order_id int references orders (id) NOT NULL,
    product_id varchar(10) references products (product_id) NOT NULL,
    quantity int NOT NULL,
    linetotal double precision NOT NULL
);

CREATE TABLE orderlogs (
    id serial PRIMARY KEY,
    order_id int references orders (id) NOT NULL,
    status varchar(20) NOT NULL,
    modified_time timestamp NOT NULL
);

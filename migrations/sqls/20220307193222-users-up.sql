/* Replace with your SQL commands For create users table */
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name varchar(40),
    last_name varchar(40),
    password text
);
ALTER SEQUENCE users_id_seq RESTART WITH 1;

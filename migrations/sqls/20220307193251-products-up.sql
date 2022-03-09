/* Replace with your SQL commands for create products table*/
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name varchar(40),
    price NUMERIC(5,2)
)
/* Replace with your SQL commands */
CREATE TYPE status_code AS ENUM('active','complete');
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id) ON DELETE CASCADE,
    product_id int REFERENCES products(id) ON DELETE CASCADE,
    status status_code,
    quantity integer NOT NULL
);
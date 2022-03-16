/* Replace with your SQL commands */
CREATE TYPE  status_code AS ENUM('active','complete');
CREATE TABLE orders (
    ord_id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id) ON DELETE CASCADE,
    status status_code
    );
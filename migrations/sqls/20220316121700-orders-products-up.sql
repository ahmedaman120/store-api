/* Replace with your SQL commands */
CREATE TABLE products_orders(
    product_id int REFERENCES products(id) ,
    order_id int REFERENCES orders(ord_id) ,
    quantity integer NOT NULL
);
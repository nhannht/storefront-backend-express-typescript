CREATE TABLE order_product (
                               id SERIAL PRIMARY KEY,
                               quantity integer,
                               product_id integer REFERENCES products(id),
                               order_id integer REFERENCES orders(id)
);

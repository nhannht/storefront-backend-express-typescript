CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100),
                          price integer CONSTRAINT positive_price CHECK (price > 0),
                          category VARCHAR(60)
);

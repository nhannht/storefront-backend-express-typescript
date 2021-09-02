/* Replace with your SQL commands */
CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        status VARCHAR(20) NOT NULL CONSTRAINT invalid_status CHECK (status='complete' OR status='pending'),
                        user_id integer REFERENCES users(id)
);

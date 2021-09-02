## API Endpoints
=> `GET /products`                       => Get all of the products available for the app. 
=> `GET /product/:id`                    => Get the details of a single product by its Id  
=> `POST /create`                        => Add a new product                              
=> `GET /products-by-category/:category` => Get all products under a particular category   
=> `GET /top-five-products`              => Get the list of five most ordered products     

=> `GET /users`        => Get all of the products available for the app. 
=> `GET /user/:id`     => Get the details of a single user by its Id     
=> `POST /user/create` => Add a new user                                 
=> `GET /authenticate` => Authenticate an existing user                  


=> `GET /order/user/:id`          => Get all orders by a particular user Id          
=> `GET /order/complete/user/:id` => Get all complete orders by a particular user Id 
=> `POST /order/create`           => Add a new order                                 
=> `POST /order/add-product`      => Add a new product to an existing order          

## Model
#### Product 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer CONSTRAINT positive_price CHECK (price > 0),
    category VARCHAR(60)

#### User

    id SERIAL PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    password VARCHAR(60)

#### Orders

    id SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL CONSTRAINT invalid_status CHECK (status='complete' OR status='pending')
    user_id integer REFERENCES users(id)

#### Order_Product

    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id integer REFERENCES products(id),
    order_id integer REFERENCES orders(id)

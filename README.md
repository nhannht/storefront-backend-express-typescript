### How to use it
###### `yarn install`

###### Set up .env file in project root with these environment variables
- POSTGRES_PASSWORD : string
- POSTGRES_TEST_USER : string, should use 'postgres'
- POSTGRES_TEST_DB : string
- POSTGRES_HOST : should use local host
- ENV : should use 'test'
- TOKEN_SECRET:string
- SALT_ROUNDS: a small number
- BCRYPT_PASSWORD: string
###### Run `docker-compose up` to set up database using docker 

###### Run `db-migrate up` to set up database tables

###### Run `yarn compile` to transform app from ts to js 

###### Run `yarn start` to start the server.

##### Use `yarn test` to run more than 40 test case

## API Endpoints:

The following endpoints are available:

| Endpoints                             | Usage                                           
| ------------------------------------- | ----------------------------------------------- 
| `GET /products`                       | Get all of the products available for the app.  
| `GET /product/:id`                    | Get the details of a single product by its Id   
| `POST /create`                        | Add a new product                               
| `GET /products-by-category/:category` | Get all products under a particular category    
| `GET /top-five-products`              | Get the list of five most ordered products      
| `GET /users`                          | Get all of the products available for the app.  
| `GET /user/:id`                       | Get the details of a single user by its Id      
| `POST /user/create`                   | Add a new user                                  
| `GET /authenticate`                   | Authenticate an existing user                   
| `GET /order/user/:id`                 | Get all orders by a particular user Id          
| `GET /order/complete/user/:id`        | Get all complete orders by a particular user Id 
| `POST /order/create`                  | Add a new order                                 
| `POST /order/add-product`             | Add a new product to an existing order          


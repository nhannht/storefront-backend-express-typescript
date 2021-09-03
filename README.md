### How to use it
###### `yarn install`

###### Set up .env file and database.json(I not hide database.json, just reuse) in project root with these environment variables, just copy below to .env if you want
```dotenv
POSTGRES_HOST=127.0.0.1
POSTGRES_TEST_DB=postgres
POSTGRES_TEST_USER=postgres
POSTGRES_DB=postgres
POSTGRES_DEV_USER=postgres
POSTGRES_PASSWORD=password
ENV=test
TOKEN_SECRET=123456
SALT_ROUNDS=2
BCRYPT_PASSWORD=password
```


- A short explanation, postgres in docker use .env file to set up database and db-migrate use database.json file. So ensure that password, username, database and host will be the same, I set up default is test mode, you can choose to use development mode if you want.
- Also notice that testing using supertest with binding to the same port with normal server ( I cannot fix this yet), so mean that you must turn off `yarn start/watch` before try to run test

###### Run `docker-compose up` to set up database using docker, when stop docker remember to use `docker-compose down` to destroy all container 
###### In case you cannot use docker, (very rare I think)
- set up postgresql directly in your machine, set up user and database(or just use default user `postgres` and default database `postgres`), all script to set up table store in migration/sqls folder, use `db-migrate up` to automate those scripts. 
- Notice that you must fix the environment `database.json` too, db-migrate use data in this file to connect with your local database.  
###### In case

- Example if you work on ubuntu:
```
- sudo apt update -y
- sudo apt install
- sudo apt install postgresql postgresql-client
- sudo systemctl start postgresql
```

###### Run `yarn db:up` to set up database tables

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


# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
| Name | URL |  Description|
|------|-----|--------------|
| index(GET) | /products | this endpoint list all products |
| show(GET) | /products/:id | this endpoint list one product|
| create(POST) Token required| /products | this endpoint accept headers authorization to check the user and then get body to save on product|
| destroy(DELETE) Token required| /products/:id | this endpoint accept headers authorization to check the user and then get body to save on product|

#### Users
| Name | URL |  Description|
|------|-----|--------------|
| index(GET) | /users | this endpoint list all users |
| show(GET) Token required| /users/:id | this endpoint list one users|
| create(POST) | /users | this endpoint accept headers authorization to check the user and then get body to save on product|
| destroy(DELETE) Token required| /users/:id | this endpoint accept headers authorization to check the user and then delete user by id params|
| login(POST) | /users/login | this endpoint check if user is verified or not and give token by send this on body {fname:string,lname:string,password:string} |



#### Orders
| Name | URL |  Description|
|------|-----|--------------|
| Orders(POST)  Token required| /orders | this endpoint accept json with this format   {user_id:number,items: [{product_id: number,status: string,quantity: number}, ] } |
| UserOrder(GET)  Token required| /orders/user/:id | this endpoint list all products that user orderd|



## Data Shapes
#### Product
| Column |         Type          | Collation |
--------+-----------------------+-----------+
| id     | integer               |           |
| name   | character varying(40) |           |
| price  | numeric(5,2)          |           |

- TABLE SCHEMA  `CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY,name varchar(40),price NUMERIC(5,2))`

#### User
|   Column   |         Type          | Collation | Nullable |
------------+-----------------------+-----------+----------+
| id         | integer               |           | not null | 
| first_name | character varying(40) |           |          |  
| last_name  | character varying(40) |           |          |  
| password   | text                  |           |          | 
- TABLE SCHEMA  `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,first_name varchar(40),last_name varchar(40),password text)`


#### Orders
   Column   |    Type     | Collation | Nullable |
------------+-------------+-----------+----------+
 id         | integer     |           | not null |
 user_id    | integer     |           |          |
 product_id | integer     |           |          |
 status     | status_code |           |          |
 quantity   | integer     |           | not null |
-TYPES IN SCHEMA `CREATE TYPE  status_code AS ENUM('active','complete');`
- TABLE SCHEMA  `CREATE TABLE orders_products (id SERIAL PRIMARY KEY,user_id int REFERENCES users(id) ON DELETE CASCADE,product_id int REFERENCES products(id) ON DELETE CASCADE,status status_code,quantity integer NOT NULL);`



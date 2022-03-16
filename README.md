# Store API


## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database 
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- cors from npm
- create .env file to main directory 
```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=admin123
POSTGRES_DB=store
ENV=prod
POSTGRES_TESTDB=store_test
BCRYPT_PASSWORD=anything
SALT_ROUNDS=10
JWT_TOKEN=eBn(WHtS#'kBE+u}IWcjEx<x=
```

## Steps to setup DB Requirments 
1. conect to psql server with admin privilages `psql -U postgres -h 127.0.0.1 -p 5432` then enter your server password
2. enter this command to create user `CREATE USER full_stack_user WITH PASSWORD 'admin123'; `
4. enter this command to create production database `CREATE DATABASE store; `
5. enter this command to create testing database `CREATE DATABASE store_test; `
6. enter this command to create user `GRANT ALL PRIVILEGES ON DATABASE store TO full_stack_user; `
7. enter this command to create user `GRANT ALL PRIVILEGES ON DATABASE store_test TO full_stack_user; `


## Steps to Completion
1. `yarn add` to install all packages required in project.
2. configure env file by put your db information and set another db for testing.
3. `yarn run test:env` to run specs files.
4. `yarn run build` to build ts files to dist folder
5. `yarn run start` to run server with node
7. look on `REQUIREMENTS.md` to curl your request on port 300.


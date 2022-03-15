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

## Steps to setup DB Requirments 
1. conect to psql server with admin privilages
2. enter this command to create user `CREATE USER full_stack_user WITH PASSWORD 'admin123'; `
3. enter this command to create production database `CREATE DATABASE store; `
4. enter this command to create testing database `CREATE DATABASE store_test; `


## Steps to Completion
1. `yarn add` to install all packages required in project.
2. configure env file by put your db information and set another db for testing.
3. `yarn run test:env` to run specs files.
4. `yarn run build` to build ts files to dist folder
5. `yarn run start` to run server with node
7. look on `REQUIREMENTS.md` to curl your request on port 300.


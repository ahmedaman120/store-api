import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

let client: Pool

if (process.env.ENV == 'prod') {
  const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
    process.env
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
} else {
  const { POSTGRES_HOST, POSTGRES_TESTDB, POSTGRES_USER, POSTGRES_PASSWORD } =
    process.env
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TESTDB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

export default client

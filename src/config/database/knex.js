import dotenv from 'dotenv'
import Knex from 'knex'

// Le arquivo .env.testing quando NODE_ENV = testing
dotenv.config({ path: process.env.NODE_ENV === 'testing' ? './.env.testing' : './.env' })

let config = {
  client: process.env.DB_CONNECTION,
  useNullAsDefault: false,
  connection: {
    filename: './__tests__/database.sqlite',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    ssl: process.env.DB_SSL,
  },
}

// Initialize knex.
export default Knex(config)

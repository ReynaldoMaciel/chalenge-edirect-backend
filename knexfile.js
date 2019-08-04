require('dotenv').config({ path: process.env.NODE_ENV === 'testing' ? './.env.testing' : './.env' })

module.exports = {
  client: process.env.DB_CONNECTION,
  useNullAsDefault: false,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    ssl: process.env.DB_SSL,
    filename: './__tests__/database.sqlite',
  },
  migrations: {
    directory: 'src/migrations',
  },
  seeds: {
    directory: 'src/seeds',
  },
}

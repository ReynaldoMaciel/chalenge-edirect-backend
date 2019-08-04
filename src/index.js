// Express
import express from 'express'

// Módulo de variáveis de ambiente
import { config } from 'dotenv'

// CORS
import cors from 'cors'

import bodyparser from 'body-parser'

import router from './routes'

// Le arquivo .env.testing quando NODE_ENV = testing
config(process.env.NODE_ENV === 'testing' ? { path: './.env.testing' } : null)

// Inicializa express
const app = express()

app.use(cors())

app.use(bodyparser.json())

router(app)

app.listen(process.env.PORT || 3001, () => {
  console.log(`App running on port ${process.env.PORT || 3001}!`)
})

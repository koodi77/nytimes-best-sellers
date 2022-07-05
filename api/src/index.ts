import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { namesRouter } from './lists/names.router'
import { booksRouter } from './lists/books.router'
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

/**
 *  App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/names', namesRouter)
app.use('/books', booksRouter)
app.use(errorHandler)
app.use(notFoundHandler)

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})